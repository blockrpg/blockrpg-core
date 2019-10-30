// 用于描述一个实际存在的地图网格单元
// 由两个元素构成，地图网格的GridMeta以及道具网格的GridMeta
// 一般来说道具网格会显示在地图网格上方
// 地图网格是必须的，道具网格是非必须的（没有任何道具站立的地图网格）
import { GridMeta } from './GridMeta';

export class MapGrid {
  // 地图网格（必须）
  private map: GridMeta;
  // 道具网格（非必须）
  private prop?: GridMeta;
  
  public get Map(): GridMeta {
    return this.map;
  }
  public set Map(value: GridMeta) {
    this.map = value;
  }
  public get Prop(): GridMeta | undefined {
    return this.prop;
  }
  public set Prop(value: GridMeta | undefined) {
    this.prop = value;
  }
  // 网格上是否存在道具
  public get HasProp(): boolean {
    return !!this.prop;
  }
  // 网格是否可以通过
  public get Pass(): boolean {
    const mapPass = this.map.Pass;
    const propPass = this.HasProp ? (this.prop as GridMeta).Pass : true;
    return mapPass && propPass;
  }
  // 网格的事件Id（道具事件优先）
  public get EventId(): string | undefined {
    const mapEvent = this.map.EventId;
    const propEvent = this.HasProp ? (this.prop as GridMeta).EventId : undefined;
    return propEvent || mapEvent;
  }

  // 构造函数
  public constructor(params: {
    map: {
      pass: boolean,
      resId: number,
      resNum: number,
      eventId?: string,
    },
    prop?: {
      pass: boolean,
      resId: number,
      resNum: number,
      eventId?: string,
    },
  }) {
    this.map = new GridMeta(params.map);
    if (params.prop) {
      this.prop = new GridMeta(params.prop);
    } else {
      this.prop = undefined;
    }
  }
}
