// 用于描述一个网格信息的类（不包含位置信息）
export class GridMeta {
  // 网格是否允许通过
  private pass: boolean;
  // 网格图片资源Id
  private resId: number;
  // 网格图片内资源序号
  private resNum: number;
  // 网格可触发的事件Id（如果有的话）
  private eventId?: string;

  public get Pass(): boolean {
    return this.pass;
  }
  public set Pass(value: boolean) {
    this.pass = value;
  }
  public get ResId(): number {
    return this.resId;
  }
  public set ResId(value: number) {
    this.resNum = value;
  }
  public get ResNum(): number {
    return this.resNum;
  }
  public set ResNum(value: number) {
    this.resNum = value;
  }
  public get EvevtId(): string | undefined {
    return this.eventId;
  }
  public set EventId(value: string | undefined) {
    this.eventId = value;
  }

  // 构造函数
  public constructor(params: {
    pass: boolean,
    resId: number,
    resNum: number,
    eventId?: string,
  }) {
    this.pass = params.pass;
    this.resId = params.resId;
    this.resNum = params.resNum;
    this.eventId = params.eventId;
  }
}
