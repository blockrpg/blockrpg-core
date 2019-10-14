import UUIDV4 from 'uuid/v4';
import Redis from 'ioredis';

const Client = new Redis();

export class Session {
  // 代替构造函数，算是一个语法糖吧
  public static From(
    key: string = '',
    validityMin: number = 20,
  ): Session {
    return new Session(key, validityMin);
  }
  // session key
  private readonly key: string;
  // session有效期（分钟）
  private readonly validityMin: number;
  public get Key(): string {
    return this.key;
  }
  public get ValidityMin(): number {
    return this.validityMin;
  }
  // 保存Session
  public async Save(value: any): Promise<string> {
    const args: string[] = [];
    const list = Object.entries(value);
    list.forEach(item => {
      args.push(...(item as [string, string]));
    });
    await Client.hmset(this.Key, args);
    await this.Update();
    return this.Key;
  }
  // 检查Session
  public async Check(): Promise<boolean> {
    await this.Update();
    const result = await Client.exists(this.Key);
    return !!result;
  }
  // 获取Session之中存储的值
  public async Get(): Promise<any> {
    await this.Update();
    return await Client.hgetall(this.Key);
  }
  // 更新Session有效期
  public async Update(): Promise<void> {
    await Client.expire(this.Key, this.ValidityMin * 60);
  }
  // 构造函数
  public constructor(
    key: string = '',
    validityMin: number = 20,
  ) {
    if (key) {
      this.key = key;
    } else {
      this.key = `session:${UUIDV4()}`;
    }
    this.validityMin = validityMin;
  }
}
