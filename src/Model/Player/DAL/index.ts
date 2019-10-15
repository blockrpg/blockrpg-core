import DBPool from '../../../DBPool';
import { INSERT_PLAYER, QUERY_PLAYER_BY_NAME, QUERY_PLAYER_BY_ID, } from '../SQL';
import { Player } from '../Entity';

// 向表中插入一个新玩家
export async function insertPlayer(player: Player) {
  await DBPool.query(INSERT_PLAYER, player.JsObj);
}
// 根据昵称查询玩家列表
export async function queryPlayerByNameDAL(name: string): Promise<any[]> {
  const result = await DBPool.query(QUERY_PLAYER_BY_NAME, name);
  return result[0];
}
// 根据Id查询玩家列表
export async function queryPlayerByIdDAL(id: number): Promise<any[]> {
  const result = await DBPool.query(QUERY_PLAYER_BY_ID, id);
  return result[0];
}
