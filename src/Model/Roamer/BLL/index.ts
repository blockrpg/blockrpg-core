
import { RoamerDAL } from '../DAL';
import { Roamer } from '../Entity';

// 根据玩家账户获取漫步者信息
// 如果Redis之中存在信息的话则优先从Redis之中获取
// 如果Redis之中不存在信息的话则从MySQL之中获取并提取到Redis内
// 如果都没有查询到信息，则返回null
export async function getRoamerBLL(account: string): Promise<Roamer | null> {
  let result: Roamer | null = null;
  result = await RoamerDAL.From().getRoamerFromRedis(account);
  if (!result) {
    result = await RoamerDAL.From().getRoamerFromDB(account);
    if (result) {
      // 提取到Redis
      await RoamerDAL.From().setRoamerToRedis(result as Roamer);
    }
  }
  return result;
}

// 在Redis之中更新漫步者信息
export async function updateRoamerBLL(roamer: Roamer): Promise<void> {
  await RoamerDAL.From().setRoamerToRedis(roamer);
}

// 更新漫步者信息（持久化并且同步到Redis之中）
export async function persistRoamerBLL(roamer: Roamer): Promise<void> {
  await RoamerDAL.From().setRoamerToDB(roamer);
  await RoamerDAL.From().setRoamerToRedis(roamer);
}

// 同步漫步者信息（从Redis之中同步到MySQL）
export async function syncRoamerBLL(account: string): Promise<void> {
  const roamer = await RoamerDAL.From().getRoamerFromRedis(account);
  if (roamer) {
    await RoamerDAL.From().setRoamerToDB(roamer as Roamer);
  }
}
