import Redis from 'ioredis';
import { Roamer } from '../Entity';
import { DAL } from '../../DAL';
import { Config } from '../../../Config';

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

  // 传入玩家账户，获取漫步者数据
  // 首先尝试从缓存读取，如果缓存没有则从数据库之中读取
  public async getRoamer(account: string): Promise<void> {
    const data = await Client.hgetall(account);
    // 如果缓存之中没有数据
    if (!data || Object.keys(data).length < 1) {

    }
  }

  // 更新漫步者数据到缓存（Redis）
  public async setRoamer(roamer: Roamer): Promise<void> {

  }

  // 持久化漫步者数据到数据库
  public async setRoamerPersist(roamer: Roamer): Promise<void> {

  }
}
