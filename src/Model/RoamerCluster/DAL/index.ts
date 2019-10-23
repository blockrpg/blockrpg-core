import Redis from 'ioredis';
import { DAL } from '../../DAL';
import { Config } from '../../../Config';
import { Roamer } from '../../Roamer/Entity';

// 根据配置文件创建Redis客户端
const Client = new Redis(Config['redis-roamercluster']);

// RoamerCluster DAL
export class RoamerClusterDAL extends DAL {
  // 静态构造语法糖
  // 这个语法糖不能通过编程语言约束
  // 必须开发者手动添加
  public static From(conn: any = null): RoamerClusterDAL {
    return new RoamerClusterDAL(conn);
  }

  // 产生Key
  private Key(value: string): string {
    return `roamercluster:${value}`;
  }

  // 在集群中设置Roamer信息
  public async setRoamer(
    clusterId: string,
    roamer: Roamer,
  ): Promise<void> {
    await Client.hset(this.Key(clusterId), roamer.Account, roamer.Json);
  }
  // 在集群中删除Roamer信息
  public async delRoamer(
    clusterId: string,
    account: string,
  ): Promise<void> {
    await Client.hdel(this.Key(clusterId), account);
  }
  // 把新的Roamer信息添加到另一个集群，并删除旧的集群之中的Roamer信息
  public async moveRoamer(
    srcClusterId: string,
    dstClusterId: string,
    roamer: Roamer,
  ): Promise<void> {
    await Client.hset(this.Key(dstClusterId), roamer.Account, roamer.Json);
    await Client.hdel(this.Key(srcClusterId), roamer.Account);
  }
  // 根据集群Id和账户在集群中查找某一Roamer信息
  public async getRoamer(
    clusterId: string,
    account: string,
  ): Promise<Roamer | null> {
    const result = await Client.hget(this.Key(clusterId), account);
    if (result) {
      return new Roamer(JSON.parse(result));
    } else {
      return null;
    }
  }
  // 查询某个集群内所有的Roamer信息
  public async queryRoamers(clusterId: string): Promise<Roamer[]> {
    const values: string[] = await Client.hvals(this.Key(clusterId));
    return values.map((value) => new Roamer(JSON.parse(value)));
  }
}
