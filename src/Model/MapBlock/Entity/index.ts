import { Point } from "../../../Point";
import { MapGrid } from './MapGrid';

export class MapBlock {
  private id: number | undefined;
  private mapId: string = '';
  private x: number = 0;
  private y: number = 0;
  private grids: MapGrid[] = [];
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
  // 构造函数
  // 主要是从数据库返回信息之中构造对象
  public constructor(params: any) {
    this.id = params.id || undefined;
    this.mapId = params.mapId || '';
    this.x = params.x || 0;
    this.y = params.y || 0;
    // 反序列化构造Grids
    const list: any[] = params.resData || [];
    this.grids = list.map(item => new MapGrid(item));
  }
}