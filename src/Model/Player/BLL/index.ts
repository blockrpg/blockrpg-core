import { Player } from "../Entity";
import { queryPlayerByNameDAL, queryPlayerByIdDAL } from "../DAL";

// 玩家注册
export async function playerRegisterBLL(
  name: string,
  password: string,
): Promise<string> {
  return '';
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
  const list = await queryPlayerByNameDAL(name);
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
  const list = await queryPlayerByIdDAL(id);
  if (list.length > 0) {
    return new Player(list[0]);
  } else {
    return null;
  }
}
