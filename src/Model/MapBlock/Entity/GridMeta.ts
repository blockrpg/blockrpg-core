import { Point } from "../../..";

// 用于描述一个网格信息的类（不包含位置信息）
export class GridMeta {
  // AllPass数字，对应全true矩阵
  public static get PassAll(): number {
    return 33554431;
  }
  // UnPassAll数字，对应全false矩阵
  public static get UnPassAll(): number {
    return 0;
  }

  // PassMask数字，用于精细化的定制Pass
  // 是一个5 * 5的Mask网格，为一个25位二进制数字
  private passMask: number;
  // 网格是否抬升（抬升的网格可以容许玩家从下方穿过）
  private raised: boolean;
  // 网格图片资源Id
  private resId: number;
  // 网格图片内资源序号
  private resNum: number;
  // 网格可触发的事件Id（如果有的话）
  private eventId?: string;

  // 是否直接通过
  public get DirectPass(): boolean {
    return this.passMask === GridMeta.PassAll;
  }
  public get PassMask(): number {
    return this.passMask;
  }
  public set PassMask(value: number) {
    this.passMask = value;
  }
  // 根据PassMask数字计算出矩阵
  public get PassMaskArray(): boolean[][] {
    return [
      [
        !!(this.passMask & 0x00000001),
        !!(this.passMask & 0x00000002),
        !!(this.passMask & 0x00000004),
        !!(this.passMask & 0x00000008),
        !!(this.passMask & 0x00000010),
      ],
      [
        !!(this.passMask & 0x00000020),
        !!(this.passMask & 0x00000040),
        !!(this.passMask & 0x00000080),
        !!(this.passMask & 0x00000100),
        !!(this.passMask & 0x00000200),
      ],
      [
        !!(this.passMask & 0x00000400),
        !!(this.passMask & 0x00000800),
        !!(this.passMask & 0x00001000),
        !!(this.passMask & 0x00002000),
        !!(this.passMask & 0x00004000),
      ],
      [
        !!(this.passMask & 0x00008000),
        !!(this.passMask & 0x00010000),
        !!(this.passMask & 0x00020000),
        !!(this.passMask & 0x00040000),
        !!(this.passMask & 0x00080000),
      ],
      [
        !!(this.passMask & 0x00100000),
        !!(this.passMask & 0x00200000),
        !!(this.passMask & 0x00400000),
        !!(this.passMask & 0x00800000),
        !!(this.passMask & 0x01000000),
      ],
    ];
  }
  // 以矩阵格式设置PassMask
  public set PassMaskArray(value: boolean[][]) {
    let number = 0;
    number |= value[0][0] ? 0x00000001 : 0;
    number |= value[0][1] ? 0x00000002 : 0;
    number |= value[0][2] ? 0x00000004 : 0;
    number |= value[0][3] ? 0x00000008 : 0;
    number |= value[0][4] ? 0x00000010 : 0;
    number |= value[1][0] ? 0x00000020 : 0;
    number |= value[1][1] ? 0x00000040 : 0;
    number |= value[1][2] ? 0x00000080 : 0;
    number |= value[1][3] ? 0x00000100 : 0;
    number |= value[1][4] ? 0x00000200 : 0;
    number |= value[2][0] ? 0x00000400 : 0;
    number |= value[2][1] ? 0x00000800 : 0;
    number |= value[2][2] ? 0x00001000 : 0;
    number |= value[2][3] ? 0x00002000 : 0;
    number |= value[2][4] ? 0x00004000 : 0;
    number |= value[3][0] ? 0x00008000 : 0;
    number |= value[3][1] ? 0x00010000 : 0;
    number |= value[3][2] ? 0x00020000 : 0;
    number |= value[3][3] ? 0x00040000 : 0;
    number |= value[3][4] ? 0x00080000 : 0;
    number |= value[4][0] ? 0x00100000 : 0;
    number |= value[4][1] ? 0x00200000 : 0;
    number |= value[4][2] ? 0x00400000 : 0;
    number |= value[4][3] ? 0x00800000 : 0;
    number |= value[4][4] ? 0x01000000 : 0;
    this.passMask = number;
  }
  public get Raised(): boolean {
    return this.raised;
  }
  public set Raised(value: boolean) {
    this.raised = value;
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

  // 输入内部移动坐标计算是否通过
  public Pass(pt: Point): boolean {
    return this.PassMaskArray[pt.Y][pt.X];
  }

  // 构造函数
  public constructor(params: {
    resId: number,
    resNum: number,
    eventId?: string,
    raised?: boolean,
    passMask?: number,
  }) {
    this.resId = params.resId;
    this.resNum = params.resNum;
    this.eventId = params.eventId;
    if (params.raised !== undefined) {
      this.raised = params.raised;
    } else {
      this.raised = false;
    }
    if (params.passMask !== undefined) {
      this.passMask = params.passMask;
    } else {
      this.passMask = GridMeta.PassAll;
    }
  }
}
