import { Player } from "../Entity";
import { PlayerDAL } from "../DAL";
import DBPool from '../../../DBPool';
import { Rtv } from "../../../Rtv";

// 玩家注册
// 这里展示了如何使用事务驱动DAL
export async function playerRegisterBLL(
  name: string,
  password: string,
): Promise<Rtv> {
  let result: Rtv;
  const conn = await DBPool.getConnection();
  const DAL = PlayerDAL.From(conn);
  await DAL.Connection.beginTransaction();
  let list = await DAL.queryPlayerByNameDAL(name);
  if (list.length < 1) {
    const newPlayer = new Player({
      name,
      password,
    });
    await DAL.insertPlayer(newPlayer);
    result = Rtv.Success('', '注册成功');
  } else {
    result = Rtv.Fail('该昵称已经被其他玩家使用了');
  }
  await DAL.Connection.commit();
  DAL.Connection.release();
  return result;
}
// 玩家登录，通过昵称
export async function playerLoginByNameBLL(
  name: string,
  password: string,
) {

}
// 玩家登录，通过账户
export async function playerLoginByAccountBLL(
  account: string,
  password: string,
) {

}
// 通过昵称查询玩家信息
export async function queryPlayerByNameBLL(name: string): Promise<Player | null> {
  const list = await PlayerDAL.From().queryPlayerByNameDAL(name);
  if (list.length > 0) {
    return new Player(list[0]);
  } else {
    return null;
  }
}
// 通过账户查询玩家信息
export async function queryPlayerByAccountBLL(account: string): Promise<Player | null> {
  let id = Number(account);
  if (isNaN(id)) {
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
