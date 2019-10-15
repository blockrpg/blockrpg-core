import UUIDV4 from 'uuid/v4';
import Redis from 'ioredis';

const Client = new Redis();

export class Session {
  // Session有效期（分钟）
  private static validityMin: number = 20;
  public static get ValidityMin(): number {
    return this.validityMin;
  }
  public static set ValidityMin(value: number) {
    this.validityMin = value;
  }

  // 把Session的Id包装成Key
  private static Key(id: string): string {
    return `session:${id}`;
  }

  // 设置新的Session
  public static async Set(value: any = {}): Promise<string> {
    const args: string[] = [];
    const list = Object.entries(value);
    list.forEach(item => {
      args.push(...(item as [string, string]));
    });
    const id = UUIDV4();
    await Client.hmset(this.Key(id), args);
    await this.Update(id);
    return id;
  }
  // 检查Session是否存在
  public static async Check(id: string): Promise<boolean> {
    await this.Update(id);
    const result = await Client.exists(this.Key(id));
    return !!result;
  }
  // 读取Session的值
  public static async Get(id: string): Promise<any> {
    await this.Update(id);
    return await Client.hgetall(this.Key(id));
  }
  // 更新Session有效期
  public static async Update(id: string): Promise<void> {
    await Client.expire(this.Key(id), this.ValidityMin * 60);
  }
}
