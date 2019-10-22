import { RoamerClusterDAL } from '../DAL';
import { PlayerMeta } from '../../PlayerMeta/Entity';

// 玩家进入集群
export async function playerEnter(blockId: string, player: PlayerMeta): Promise<void> {
  await RoamerClusterDAL.From().insertPlayer(blockId, player);
}

// 玩家离开集群
export async function playerLeave(blockId: string, player: PlayerMeta): Promise<void> {
  await RoamerClusterDAL.From().removePlayer(blockId, player);
}

// 玩家从一个集群移到另外一个集群
export async function playerMove(
  srcBlockId: string,
  dstBlockId: string,
  player: PlayerMeta,
): Promise<void> {
  await RoamerClusterDAL.From().movePlayer(srcBlockId, dstBlockId, player);
}

// 查询集群内的所有玩家
export async function queryPlayers(blockId: string): Promise<PlayerMeta[]> {
  return await RoamerClusterDAL.From().getPlayers(blockId);
}
