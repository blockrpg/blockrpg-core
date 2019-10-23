import { Point } from "../../../Point";
import { Space } from '../../../Space';

// 漫步者
export class Roamer {
  private account: string;
  private name: string;
  private image: number;
  private x: number;
  private y: number;
  private dir: number;
  private ges: number;

  public get Account(): string {
    return this.account;
  }
  public get Name(): string {
    return this.name;
  }
  public get Image(): number {
    return this.image;
  }
  public get X(): number {
    return this.x;
  }
  public get Y(): number {
    return this.y;
  }
  public get Dir(): number {
    return this.dir;
  }
  public get Ges(): number {
    return this.ges;
  }
  // 漫步者当前空间坐标
  public get CurSpacePoint(): Point {
    return new Point(this.x, this.y);
  }
  // 漫步者当前网格坐标
  public get CurGridPoint(): Point {
    return Space.ToGrid(this.CurSpacePoint);
  }
  // 漫步者当前Block坐标
  public get CurBlockPoint(): Point {
    return Space.ToBlock(this.CurSpacePoint);
  }
  // 获取对象的Json字符串，方便在Redis之中存储
  public get Json(): string {
    return JSON.stringify(this);
  }

  // 构造函数
  public constructor(params: {
    account: string,
    name: string,
    image: number | string,
    x: number | string,
    y: number | string,
    dir: number | string,
    ges: number | string,
  }) {
    this.account = params.account;
    this.name = params.name;
    this.image = Number(params.image);
    this.x = Number(params.x);
    this.y = Number(params.y);
    this.dir = Number(params.dir);
    this.ges = Number(params.ges);
  }
}
