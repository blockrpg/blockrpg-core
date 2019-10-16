import { Player } from "../Entity";
import { PlayerDAL } from "../DAL";
import DBPool from '../../../DBPool';
import { Rtv } from "../../../Rtv";

// 玩家注册
// 输入昵称以及密码进行玩家注册
// 这里展示了如何使用事务驱动DAL
export async function playerRegisterBLL(
  name: string,
  password: string,
): Promise<Rtv<Player>> {
  let result: Rtv<Player>;
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
      result = Rtv.Success(newPlayer, '注册成功');
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
// 玩家登录，可以通过昵称和账户进行登录
export async function playerLoginBLL(
  input: string,
  password: string,
) {

}
// 通过昵称查询玩家信息
// 查询到了则返回玩家信息，否则返回null
export async function queryPlayerByNameBLL(name: string): Promise<Player | null> {
  const list = await PlayerDAL.From().queryPlayerByNameDAL(name);
  if (list.length > 0) {
    return new Player(list[0]);
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
    return new Player(list[0]);
  } else {
    return null;
  }
}
