import { Point } from "../Point";

// 进行空间坐标相关计算的类
export class Space {
  // 空间坐标转换为网格坐标
  public static ToGrid(pt: Point): Point {
    return new Point(
      Math.floor((pt.X + 2) / 5),
      Math.floor((pt.Y + 2) / 5),
    );
  }
  // 空间坐标转换为块坐标
  public static ToBlock(pt: Point): Point {
    return this.GridToBlock(this.ToGrid(pt));
  }
  // 网格坐标转换为块坐标
  public static GridToBlock(pt: Point): Point {
    return new Point(
      Math.floor((pt.X + 10) / 21),
      Math.floor((pt.Y + 6) / 13),
    );
  }
}
