import UUIDV4 from 'uuid/v4';
import Redis from 'ioredis';
import { Config } from '../Config';
import { PlayerMeta } from '../Model/PlayerMeta/Entity';

// 根据配置文件创建用于Session访问的Redis客户端
const Client = new Redis(Config['redis-session']);

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
  public static async Set(value: PlayerMeta): Promise<string> {
    const args: string[] = [];
    const list = Object.entries({
      account: value.Account,
      name: value.Name,
      image: value.Image,
    });
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
  // 如果存在则返回一个PlayerMeta信息
  // 如果不存在则返回null
  public static async Get(id: string): Promise<PlayerMeta | null> {
    await this.Update(id);
    const result = await Client.hgetall(this.Key(id));
    if (Object.keys(result).length >= 3) {
      // 这里手动处理一下类型兼容
      result['image'] = Number(result['image']);
      return new PlayerMeta(result);
    } else {
      return null;
    }
  }
  // 更新Session有效期
  public static async Update(id: string): Promise<void> {
    await Client.expire(this.Key(id), this.ValidityMin * 60);
  }
}
