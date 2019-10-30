import { Rect } from "../../../Rect";
import { MapBlockDAL } from '../DAL';
import { MapBlock } from "../Entity";
import { Point } from "../../..";

  // 矩形范围查询某一地图的Block
export async function queryRectBLL(mapId: string, rect: Rect): Promise<MapBlock[]> {
  if (
      !mapId ||
      rect.Width > 3 ||
      rect.Height > 3
    ) {
    return []
  }
  const result = await MapBlockDAL.From().queryRectDAL(mapId, rect);
  return result;
}

// 新增Block
export async function newBlock(block: MapBlock): Promise<void> {
  await MapBlockDAL.From().insertBlock(block);
}
// 删除Block
export async function deleteBlock(
  mapId: string,
  blockPos: Point,
): Promise<void> {
  await MapBlockDAL.From().deleteBlock(mapId, blockPos);
}
// 修改Block
export async function updateBlock(block: MapBlock): Promise<void> {
  await MapBlockDAL.From().updateBlock(block);
}
// 查询Block
export async function queryBlock(
  mapId: string,
  blockPos: Point,
): Promise<MapBlock | null> {
  return await MapBlockDAL.From().queryBlock(mapId, blockPos);
}