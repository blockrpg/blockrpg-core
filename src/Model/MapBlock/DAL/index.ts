import { QUERY_RECT } from '../SQL';
import { MapBlock } from '../Entity';
import { DAL } from '../../DAL';
import { Rect } from '../../../Rect';

// 地图BlockDAL
export class MapBlockDAL extends DAL {
  // 静态构造语法糖
  // 这个语法糖不能通过编程语言约束
  // 必须开发者手动添加
  public static From(conn: any = null): MapBlockDAL {
    return new MapBlockDAL(conn);
  }
  // 矩形范围查询某一地图的Block
  public async queryRectDAL(mapId: string, rect: Rect): Promise<MapBlock[]> {
    const result = await this.DBCaller.query(
      QUERY_RECT,
      [mapId, rect.X1, rect.Y1, rect.X2, rect.Y2,]
    );
    const list: any[] = result[0];
    return list.map(item => new MapBlock(item));
  }
}
