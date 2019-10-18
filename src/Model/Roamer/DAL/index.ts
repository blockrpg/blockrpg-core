import Redis from 'ioredis';
import { Roamer } from '../Entity';
import { DAL } from '../../DAL';
import { Config } from '../../../Config';
import { QUERY_ROAMER, UPDATE_ROAMER } from '../SQL';

// 根据配置文件创建用于Session访问的Redis客户端
const Client = new Redis(Config['redis-roamer']);

// 玩家DAL
export class RoamerDAL extends DAL {
  // 静态构造语法糖
  // 这个语法糖不能通过编程语言约束
  // 必须开发者手动添加
  public static From(conn: any = null): RoamerDAL {
    return new RoamerDAL(conn);
  }

  // 从Redis之中读取Roamer数据
  public async getRoamerFromRedis(account: string): Promise<Roamer | null> {
    // 尝试从Redis之中读取
    const result = await Client.hgetall(account);
    if (result && Object.keys(result).length > 0) {
      return new Roamer(result);
    } else {
      return null;
    }
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
  // 更新Roamer数据到Redis
  public async setRoamerToRedis(roamer: Roamer): Promise<void> {
    const list = Object.entries(roamer);
    const args: string[] = [];
    list.forEach(item => {
      args.push(...item);
    });
    await Client.hmset(roamer.Account, args);
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
