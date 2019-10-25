import { Point } from "../../../Point";
import { MapGrid } from './MapGrid';

export class MapBlock {
  private id: number | undefined;
  private mapId: string;
  private x: number;
  private y: number;
  private grids: MapGrid[];

  public get Id(): number | undefined {
    return this.id;
  }
  public set Id(value: number | undefined) {
    this.id = value;
  }
  public get MapId(): string {
    return this.mapId;
  }
  public set MapId(value: string) {
    this.mapId = value;
  }
  public get X(): number {
    return this.x;
  }
  public set X(value: number) {
    this.x = value;
  }
  public get Y(): number {
    return this.y;
  }
  public set Y(value: number) {
    this.y = value;
  }
  public get Grids(): MapGrid[] {
    return this.grids;
  }
  public set Grids(value: MapGrid[]) {
    this.grids = value;
  }
  // 获取Block的坐标点（Point类型）
  public get Point(): Point {
    return new Point(this.x, this.y);
  }

  // 转化成操作数据库可用的格式
  public ToDB() {
    return {
      mapId: this.mapId,
      x: this.x,
      y: this.y,
      resData: JSON.stringify(this.grids),
    };
  }

  // 从数据库返回结果构建对象
  public static FromDB(params: {
    id: number | undefined,
    mapId: string,
    x: number,
    y: number,
    resData: any[],
  }): MapBlock {
    const block = new MapBlock({
      id: params.id,
      mapId: params.mapId,
      x: params.x,
      y: params.y,
      grids: (params.resData || []).map((item) => new MapGrid(item)),
    });
    return block;
  }

  // 构造函数
  public constructor(params: {
    id: number | undefined,
    mapId: string,
    x: number,
    y: number,
    grids: MapGrid[],
  }) {
    this.id = params.id || undefined;
    this.mapId = params.mapId || '';
    this.x = params.x || 0;
    this.y = params.y || 0;
    this.grids = params.grids || [];
  }
}
