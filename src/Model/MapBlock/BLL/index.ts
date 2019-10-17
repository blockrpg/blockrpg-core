import { Rect } from "../../../Rect";
import { MapBlockDAL } from '../DAL';
import { MapBlock } from "../Entity";

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
