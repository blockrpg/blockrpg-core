import { QUERY_RECT, INSERT_BLOCK, UPDATE_BLOCK, DELETE_BLOCK, QUERY_BLOCK } from '../SQL';
import { MapBlock } from '../Entity';
import { DAL } from '../../DAL';
import { Rect } from '../../../Rect';
import { Point } from '../../..';

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
    return list.map((item) => MapBlock.FromDB(item));
  }

  // 在某地图内初始化一个新的区块
  public async insertBlock(block: MapBlock): Promise<void> {
    await this.DBCaller.query(INSERT_BLOCK, block.ToDB());
  }
  // 删除Block
  public async deleteBlock(
    mapId: string,
    blockPos: Point,
  ): Promise<void> {
    await this.DBCaller.query(
      DELETE_BLOCK,
      [
        mapId,
        blockPos.X,
        blockPos.Y,
      ],
    );
  }
  // 更新Block
  public async updateBlock(block: MapBlock): Promise<void> {
    const dbMapBlock = block.ToDB();
    await this.DBCaller.query(
      UPDATE_BLOCK,
      [dbMapBlock.resData, dbMapBlock.mapId, dbMapBlock.x, dbMapBlock.y],
    );
  }
  // 查询Block
  // 查询到结果返回MapBlock对象
  // 未找到则返回null
  public async queryBlock(
    mapId: string,
    blockPos: Point,
  ): Promise<MapBlock | null> {
    const result = await this.DBCaller.query(
      QUERY_BLOCK,
      [
        mapId,
        blockPos.X,
        blockPos.Y,
      ],
    );
    const list: any[] = result[0];
    if (list.length > 0) {
      return MapBlock.FromDB(list[0]);
    } else {
      return null;
    }
  }
}
