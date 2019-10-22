import { PlayerMeta } from "../../../Model/PlayerMeta/Entity";

// SocketIO的Client类型（自定义）
// 携带了玩家Meta信息和登录Session
export class Client {
  private socket: SocketIO.Socket;
  private player?: PlayerMeta;
  private session?: string;

  public get Socket(): SocketIO.Socket {
    return this.socket;
  }
  public get Player(): PlayerMeta {
    if (this.player) {
      return this.player as PlayerMeta;
    } else {
      throw(new Error('player为空'));
    }
  }
  public get Session(): string {
    if (this.session) {
      return this.session as string;
    } else {
      throw(new Error('session为空'));
    }
  }

  // 构造函数
  // Socket是必传的，为连接成功后返回的连接到客户端的Socket对象
  // Player和Session在非登录权限模式下不是必须的
  public constructor(
    socket: SocketIO.Socket,
    player?: PlayerMeta,
    session?: string,
  ) {
    this.socket = socket;
    this.player = player;
    this.session = session;
  }
}
