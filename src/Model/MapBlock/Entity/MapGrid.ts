export class MapGrid {
  private pass: boolean = false;
  private resId: number = 1;
  private resNum: number = 1;
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
    this.resId = value;
  }
  public get ResNum(): number {
    return this.resNum;
  }
  public set ResNum(value: number) {
    this.resNum = value;
  }
  public constructor(params: any) {
    this.pass = params.pass || false;
    this.resId = params.resId || 0;
    this.resNum = params.resNum || 0;
  }
}
