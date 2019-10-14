import { Point } from "..";

export class Rect {
  // 从两个点之中构建矩形
  public static FromTwoPoints(pt1: Point, pt2: Point): Rect {
    return this.FromPoints([pt1, pt2]);
  }
  // 从多个点之中构建矩形（范围感知）
  public static FromPoints(pts: Point[]): Rect {
    if (pts.length < 1) {
      throw(new Error('待感知点个数必须大于等于1'));
    }
    const minX = Math.min(...pts.map(pt => pt.X));
    const maxX = Math.max(...pts.map(pt => pt.X));
    const minY = Math.min(...pts.map(pt => pt.Y));
    const maxY = Math.max(...pts.map(pt => pt.Y));
    const w = maxX - minX + 1;
    const h = maxY - minY + 1;
    return new Rect(minX, minY, w, h);
  }
  private readonly x: number = 0;
  private readonly y: number = 0;
  private readonly w: number = 1;
  private readonly h: number = 1;
  public get X(): number {
    return this.x;
  }
  public get X1(): number {
    return this.x;
  }
  public get X2(): number {
    return this.x + this.w - 1;
  }
  public get Y(): number {
    return this.y;
  }
  public get Y1(): number {
    return this.y;
  }
  public get Y2(): number {
    return this.y + this.h - 1;
  }
  public get Width(): number {
    return this.w;
  }
  public get Height(): number {
    return this.h;
  }
  // 返回矩形的所有坐标点
  public get Points(): Point[] {
    const list: Point[] = [];
    let x = this.x;
    let y = this.y;
    for (let i = 0; i < this.h; ++i) {
      for (let j = 0; j < this.w; ++j) {
        list.push(new Point(x + j, y + i));
      }
    }
    return list;
  }
  // 构造函数
  public constructor(
    x: number = 0,
    y: number = 0,
    w: number = 1,
    h: number = 1,
  ) {
    this.x = x;
    this.y = y;
    if (w < 1) {
      throw(new Error('矩形宽度不能小于1'));
    }
    this.w = w;
    if (h < 1) {
      throw(new Error('矩形高度不能小于1'));
    }
    this.h = h;
  }
}
