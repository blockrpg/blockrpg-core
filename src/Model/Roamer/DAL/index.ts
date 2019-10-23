import { Roamer } from '../Entity';
import { DAL } from '../../DAL';
import { QUERY_ROAMER, UPDATE_ROAMER } from '../SQL';

// 玩家DAL
export class RoamerDAL extends DAL {
  // 静态构造语法糖
  // 这个语法糖不能通过编程语言约束
  // 必须开发者手动添加
  public static From(conn: any = null): RoamerDAL {
    return new RoamerDAL(conn);
  }

  // 从数据库之中读取Roamer数据
  public async getRoamerFromDB(account: string): Promise<Roamer | null> {
    const result = await this.DBCaller.query(QUERY_ROAMER, account);
    const list: any[] = result[0];
    if (list.length > 0) {
      return new Roamer(list[0]);
    } else {
      return null;
    }
  }
  // 持久化Roamer数据到DB
  public async setRoamerToDB(roamer: Roamer): Promise<void> {
    const updParams = {
      x: roamer.X,
      y: roamer.Y,
      dir: roamer.Dir,
      ges: roamer.Ges,
    };
    await this.DBCaller.query(UPDATE_ROAMER, [updParams, roamer.Account]);
  }
}
