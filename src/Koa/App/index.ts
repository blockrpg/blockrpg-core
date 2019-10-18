import Koa from 'koa';
import Router from 'koa-router';
import KoaBodyParser from 'koa-bodyparser';
import { Server } from 'http';
import Hold404 from '../Hold404';
import Auth from '../Auth';
import { Config } from '../../Config';

// 简单封装的KoaApp
export class App {
  // 服务名称
  private name: string;
  private app: Koa<Koa.DefaultState, Koa.DefaultContext>;
  private router: Router<any, {}>;

  public get App(): Koa<Koa.DefaultState, Koa.DefaultContext> {
    return this.app;
  }

  public get Router(): Router<any, {}> {
    return this.router;
  }

  public get Name(): string {
    return this.name;
  }

  // 构造函数
  // app暴露函数，是否需要登录访问，路由配置
  public constructor(
    name: string,
    func:
    (app: Koa<Koa.DefaultState, Koa.DefaultContext>) => any,
    auth: boolean = true,
    routerOpt?: Router.IRouterOptions | undefined) {
    this.name = name;
    this.app = new Koa();
    this.router = new Router(routerOpt);
    // 判断App访问是否需要登录权限
    const newApp = auth ? this.app.use(Auth).use(KoaBodyParser()) : this.app.use(KoaBodyParser());
    const nextApp = func(newApp);
    nextApp
      .use(this.router.allowedMethods())
      .use(Hold404);
  }

  // 与Koa的Listen一致
  // 但是可以智能读取Config里面的端口配置
  public Listen(
    port?: number,
    hostname?: string,
    backlog?: number,
    listeningListener?: (() => void) | undefined
  ): Server {
    let smtPort = port || Config['port'];
    if (isFinite(smtPort)) {
      smtPort = Math.floor(Number(smtPort));
      const result = this.app.listen(
        smtPort,
        hostname,
        backlog,
        listeningListener,
      );
      console.log(`👌Koa: ${this.name} 服务已启动在 ${smtPort} 端口🚀...`);
      return result;
    } else {
      throw new Error('请传入或在配置文件中配置正确的服务端口');
    }
  }
}
