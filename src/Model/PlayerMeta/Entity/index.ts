// 玩家Meta信息类
// 此类可用在Session以及RoamerCluster之中
export class PlayerMeta {
  // Id数字转换为账户字符串
  public static ToAccount(id: number): string {
    if (id >= 1) {
      return (Math.floor(id) + 10000).toString();
    } else {
      throw(new Error('id必须大于等于1'));
    }
  }
  // 账户字符串转换为Id数字
  public static ToId(account: string): number {
    if (/^[1-9]\d{4,}$/.test(account)) {
      return Number(account);
    } else {
      throw(new Error('account格式非法'));
    }
  }

  private account: string;
  private name: string;
  private image: number;

  public get Id(): number {
    return PlayerMeta.ToId(this.account);
  }
  public get Account(): string {
    return this.account;
  }
  public get Name(): string {
    return this.name;
  }
  public get Image(): number {
    return this.image;
  }
  // 转换为Json字符串，有利于存储
  public get Json(): string {
    return JSON.stringify({
      account: this.account,
      name: this.name,
      image: this.image,
    });
  }

  // 构造函数
  public constructor(params: {
    account: string,
    name: string,
    image: number,
  }) {
    this.account = params.account;
    this.name = params.name;
    this.image = params.image;
  }
}
