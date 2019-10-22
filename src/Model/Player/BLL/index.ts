import { Player } from "../Entity";
import { PlayerDAL } from "../DAL";
import DBPool from '../../../DBPool';
import { Rtv } from "../../../Rtv";
import { Session } from '../../../Session';
import { PlayerMeta } from "../../PlayerMeta/Entity";

// 判断一个文本是否为本系统账户（纯数字）
function isAccount(text: string): boolean {
  return /^\d+$/.test(text.trim());
}

// 玩家注册
// 输入昵称以及密码进行玩家注册
// 这里展示了如何使用事务驱动DAL
export async function playerRegisterBLL(
  name: string,
  password: string,
): Promise<Rtv<Player>> {
  let result: Rtv<Player>;
  // 如果玩家昵称为纯数字的话（登录时与账户歧义）
  if (isAccount(name)) {
    result = Rtv.Fail('玩家昵称不能为纯数字');
    return result;
  }
  // 从连接池之中获取数据库连接
  const conn = await DBPool.getConnection();
  // 根据数据库连接构建数据访问层
  const DAL = PlayerDAL.From(conn);
  // 开启事务
  await DAL.Connection.beginTransaction();
  const list = await DAL.queryPlayerByNameDAL(name);
  if (list.length < 1) {
    const newPlayer = new Player({
      name,
      password,
    });
    // 随机初始化玩家形象
    newPlayer.Image = Math.floor(Math.random() * 14);
    const id = await DAL.insertPlayer(newPlayer);
    if (id) {
      newPlayer.Id = id;
      result = Rtv.Success(newPlayer.FEObj, '注册成功');
    } else {
      result = Rtv.Fail('注册失败，无法创建新玩家');
    }
  } else {
    result = Rtv.Fail('该昵称已经被其他玩家使用了');
  }
  // 提交事务
  await DAL.Connection.commit();
  // 释放数据库连接
  DAL.Connection.release();
  return result;
}
// 玩家登录
// 可以通过昵称和账户进行登录
// 返回为登录Session以及玩家信息
export async function playerLoginBLL(
  input: string,
  password: string,
): Promise<Rtv<{
  session: string,
  player: Player,
}>> {
  let result: Player | null = null;
  // 登录类型字段描述
  let infoName = '';
  // 玩家查询结果
  let list: any[] = [];
  // 区分通过账户和通过昵称登录
  if (isAccount(input)) {
    infoName = '账户';
    list = await PlayerDAL.From().queryPlayerByIdDAL(Math.floor(Number(input)) - 10000);
  } else {
    infoName = '昵称';
    list = await PlayerDAL.From().queryPlayerByNameDAL(input);
  }
  // 设置result
  if (list.length > 0) {
    result = new Player(list[0]);
  }
  if (result && (result as Player).Password === password) {
    const player = result as Player;
    // 设置登录Session
    const session = await Session.Set(new PlayerMeta({
      account: player.Account,
      name: player.Name,
      image: player.Image,
    }));
    return Rtv.Success({
      session: session,
      player: player.FEObj,
    });
  } else {
    return Rtv.Fail(`玩家${infoName}或密码错误`);
  }
}
// 通过昵称查询玩家信息
// 查询到了则返回玩家信息，否则返回null
export async function queryPlayerByNameBLL(name: string): Promise<Player | null> {
  const list = await PlayerDAL.From().queryPlayerByNameDAL(name);
  if (list.length > 0) {
    return new Player(list[0]).FEObj;
  } else {
    return null;
  }
}
// 通过账户查询玩家信息
// 查询到了则返回玩家信息，否则返回null
export async function queryPlayerByAccountBLL(account: string): Promise<Player | null> {
  let id = Number(account);
  // 如果传入的账户非法
  if (isNaN(id) || id < 10001) {
    return null;
  }
  id -= 10000;
  id = Math.floor(id);
  const list = await PlayerDAL.From().queryPlayerByIdDAL(id);
  if (list.length > 0) {
    return new Player(list[0]).FEObj;
  } else {
    return null;
  }
}
