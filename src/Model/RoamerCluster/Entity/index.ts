
// 漫步者集群类
// 每一个地图区块会在Redis之中缓存一个漫步者集群
import { PlayerMeta } from '../../PlayerMeta/Entity';

export class RoamerCluster {
  private blockId: string;
  private players: PlayerMeta[];

  // 地图块Id
  public get BlockId(): string {
    return this.blockId;
  }
  // 在当前块之中的所有玩家列表（这里存储的是PlayerMeta信息）
  public get Players(): PlayerMeta[] {
    return this.players;
  }

  // 构造函数
  public constructor(
    blockId: string,
    players: string[],
  ) {
    this.blockId = blockId;
    this.players = players.map((json) => new PlayerMeta(JSON.parse(json)));
  }
}
