import { Rect } from "../Rect";

// 用于描述平面直角坐标系之中坐标点的类
export class Point {
  private readonly x: number = 0;
  private readonly y: number = 0;
  public get X(): number {
    return this.x;
  }
  public get Y(): number {
    return this.y;
  }
  // 构建代表坐标点的唯一Id字符串（~分隔）
  public get Id(): string {
    return `${this.x}~${this.y}`;
  }
  // 生成点附近的九宫格范围矩形
  public get NineRect(): Rect {
    return new Rect(this.x - 1, this.y - 1, 3, 3);
  }
  // 生成点附近的九宫格范围的坐标列表
  public get Nine(): Point[] {
    return this.NineRect.Points;
  }
  // 生成点附近的九宫格范围的坐标列表（不包括自身点）
  public get Eight(): Point[] {
    return this.Nine.filter(pt => !this.Equal(pt));
  }
  // 判断另外一个坐标点是否和本坐标点相等
  public Equal(pt: Point): boolean {
    return (
      this.X === pt.X &&
      this.Y === pt.Y
    );
  }
  // 构造函数
  public constructor(x: number = 0, y: number = 0) {
    this.x = Math.floor(x);
    this.y = Math.floor(y);
  }
}
