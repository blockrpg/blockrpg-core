
// 漫步者集群类
// 每一个地图区块会在Redis之中缓存一个漫步者集群
// Id为地图区块的Id，Accounts为当前存储在此集群中的玩家账户
class RoamerCluster {
  private id: string;
  private accounts: string[];

  public get Id(): string {
    return this.id;
  }

  public get Accounts(): string[] {
    return this.accounts;
  }

  public constructor(
    id: string,
    accounts: string[] = [],
  ) {
    this.id = id;
    this.accounts = accounts;
  }
}
