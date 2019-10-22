import Redis from 'ioredis';
import { RoamerCluster } from '../Entity';
import { DAL } from '../../DAL';
import { Config } from '../../../Config';
import { PlayerMeta } from '../../PlayerMeta/Entity';

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
  // 查询某一Cluster之中的所有玩家信息
  public async getPlayers(blockId: string): Promise<PlayerMeta[]> {
    const members: string[] = await Client.smembers(this.Key(blockId));
    return members.map((json) => new PlayerMeta(JSON.parse(json)));
  }
  // 把玩家信息插入到某一Cluster
  public async insertPlayer(blockId: string, player: PlayerMeta): Promise<void> {
    await Client.sadd(this.Key(blockId), player.Json);
  }
  // 从某一Cluster之中删除玩家信息
  public async removePlayer(blockId: string, player: PlayerMeta): Promise<void> {
    await Client.srem(this.Key(blockId), player.Json);
  }
  // 在两个Cluster之间移动玩家信息
  public async movePlayer(
    srcBlockId: string,
    dstBlockId: string,
    player: PlayerMeta,
  ): Promise<void> {
    await Client.smove(this.Key(srcBlockId), this.Key(dstBlockId), player.Json);
  }
}
