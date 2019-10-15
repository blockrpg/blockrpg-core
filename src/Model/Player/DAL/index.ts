import DBPool from '../../../DBPool';
import { INSERT_PLAYER, QUERY_PLAYER_BY_NAME, QUERY_PLAYER_BY_ID, } from '../SQL';
import { Player } from '../Entity';

export class PlayerDAL {
  // 静态构造语法糖
  public static From(conn: any = null) {
    return new PlayerDAL(conn);
  }
  // 数据库链接
  private conn: any = null;
  // 构造函数
  public constructor(conn: any = null) {
    this.conn = conn;
  }
  // 获取传入的数据库连接
  public get Connection(): any {
    return this.conn;
  }
  // 如果传入了数据库连接的话则使用数据库连接
  // 否则的话将使用数据库连接池
  public get DBCaller(): any {
    if (this.conn) {
      return this.conn;
    } else {
      return DBPool;
    }
  }
  // 向表中插入一个玩家
  public async insertPlayer(player: Player) {
    await this.DBCaller.query(INSERT_PLAYER, player.JsObj);
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
