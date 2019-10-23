import { Roamer } from '../Entity';
import { RoamerDAL } from '../DAL';
import { RoamerClusterDAL } from '../../RoamerCluster/DAL';

// 根据玩家账户提升漫步者信息
// 从MySQL之中查询漫步者信息，并且提升到Redis的RoamerCluster之中
// 返回提升的漫步者信息，如果没有查询到则返回null
export async function upgradeRoamerBLL(account: string): Promise<Roamer | null> {
  const result = await RoamerDAL.From().getRoamerFromDB(account);
  // 尝试把获取的Roamer信息提升到RoamerCluster之中
  if (result) {
    const roamer = result as Roamer;
    await RoamerClusterDAL.From().setRoamer(roamer.CurBlockPoint.Id, roamer);
  }
  return result;
}
// 在Redis之中更新漫步者信息
export async function updateRoamerBLL(roamer: Roamer): Promise<void> {
  await RoamerClusterDAL.From().setRoamer(roamer.CurBlockPoint.Id, roamer);
}
// 持久化漫步者信息（持久化并且同步到Redis之中）
export async function persistRoamerBLL(roamer: Roamer): Promise<void> {
  await Promise.all([
    RoamerDAL.From().setRoamerToDB(roamer),
    RoamerClusterDAL.From().setRoamer(roamer.CurBlockPoint.Id, roamer),
  ]);
}
