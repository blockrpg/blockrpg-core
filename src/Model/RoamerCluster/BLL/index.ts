import { RoamerClusterDAL } from '../DAL';
import { Roamer } from '../../Roamer/Entity';

// Roamer进入某一个集群
export async function roamerEnter(
  clusterId: string,
  roamer: Roamer,
): Promise<void> {
  await RoamerClusterDAL.From().setRoamer(clusterId, roamer);
}
// Roamer离开某一个集群
export async function roamerLeave(
  clusterId: string,
  account: string,
): Promise<void> {
  await RoamerClusterDAL.From().delRoamer(clusterId, account);
}
// Roamer从一个集群移动到另外一个集群
export async function roamerMove(
  srcClusterId: string,
  dstClusterId: string,
  roamer: Roamer,
): Promise<void> {
  await RoamerClusterDAL.From().moveRoamer(srcClusterId, dstClusterId, roamer);
}
// 查询某个Cluster内当前所有的Roamer信息
export async function getRoamers(clusterId: string): Promise<Roamer[]> {
  return await RoamerClusterDAL.From().queryRoamers(clusterId);
}
