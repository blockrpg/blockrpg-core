export class Player {
  private id: number | undefined = undefined;
  private name: string = '';
  private password: string = '';
  private image: number = 0;
  private x: number = 0;
  private y: number = 0;
  private dir: number = 1;
  private ges: number = 0;
  public get Id(): number | undefined {
    return this.id;
  }
  public set Id(value: number | undefined) {
    this.id = value;
  }
  public get Name(): string {
    return this.name;
  }
  public set Name(value: string) {
    this.name = value;
  }
  public get Password(): string {
    return this.password;
  }
  public set Password(value: string) {
    this.password = value;
  }
  public get Image(): number {
    return this.image;
  }
  public set Image(value: number) {
    this.image = value;
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
  public get Dir(): number {
    return this.dir;
  }
  public set Dir(value: number) {
    this.dir = value;
  }
  public get Ges(): number {
    return this.ges;
  }
  public set Ges(value: number) {
    this.ges = value;
  }
  // 获取玩家账户
  public get Account(): string {
    if (this.id === undefined) {
      throw(new Error('id为空无法获取account'));
    }
    return (this.id as number + 10000).toString();
  }
  // Ts对象转换成为Js对象
  public get JsObj(): any {
    return { ...this };
  }
  // 构造函数
  public constructor(params: any = {}) {
    this.id = params.id;
    this.name = params.name || '';
    this.password = params.password || '';
    this.image = params.image || 0;
    this.x = params.x || 0;
    this.y = params.y || 0;
    this.dir = params.dir || 1;
    this.ges = params.ges || 0;
  }
}
