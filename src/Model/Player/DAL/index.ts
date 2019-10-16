import { INSERT_PLAYER, QUERY_PLAYER_BY_NAME, QUERY_PLAYER_BY_ID, } from '../SQL';
import { Player } from '../Entity';
import { DAL } from '../../DAL';

// 玩家DAL
export class PlayerDAL extends DAL {
  // 静态构造语法糖
  // 这个语法糖不能通过编程语言约束
  // 必须开发者手动添加
  public static From(conn: any = null): PlayerDAL {
    return new PlayerDAL(conn);
  }
  // 向表中插入一个玩家
  // 返回插入的玩家Id
  // 如果没有成功插入则返回null
  public async insertPlayer(player: Player): Promise<number | null> {
    const result = await this.DBCaller.query(INSERT_PLAYER, player.JsObj);
    if (result[0] && result[0].insertId) {
      return result[0].insertId as number;
    } else {
      return null;
    }
  }
  // 通过昵称查询玩家（列表）
  public async queryPlayerByNameDAL(name: string): Promise<any[]> {
    const result = await this.DBCaller.query(QUERY_PLAYER_BY_NAME, name);
    return result[0];
  }
  // 通过Id查询玩家（列表）
  public async queryPlayerByIdDAL(id: number): Promise<any[]> {
    const result = await this.DBCaller.query(QUERY_PLAYER_BY_ID, id);
    return result[0];
  }
}
