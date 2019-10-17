// SocketIO的Client类型（自定义）
// 携带了玩家信息和登录Session
export class Client {
  private socket: SocketIO.Socket;
  private player: any;
  private session?: string;

  public get Socket(): SocketIO.Socket {
    return this.socket;
  }

  public get Player(): any {
    return this.player;
  }

  public get Session(): string | undefined {
    return this.session;
  }

  public constructor(
    socket: SocketIO.Socket,
    player: any = undefined,
    session?: string,
  ) {
    this.socket = socket;
    this.player = player;
    this.session = session;
  }
}
