// 用于描述平面直角坐标系之中坐标点的类
export class Point {
  private x: number = 0;
  private y: number = 0;
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
  // 构造函数
  public constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }
}
