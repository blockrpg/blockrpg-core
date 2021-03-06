import Koa from 'koa';
import Router from 'koa-router';
import KoaBodyParser from 'koa-bodyparser';
import { Server } from 'http';
import Hold404 from '../Hold404';
import Auth from '../Auth';

// 简单封装的KoaApp
export class App {
  private app: Koa<Koa.DefaultState, Koa.DefaultContext>;
  private router: Router<any, {}>;

  public get App(): Koa<Koa.DefaultState, Koa.DefaultContext> {
    return this.app;
  }

  public get Router(): Router<any, {}> {
    return this.router;
  }

  // 构造函数
  // app暴露函数，是否需要登录访问，路由配置
  public constructor(
    func:
    (app: Koa<Koa.DefaultState, Koa.DefaultContext>) => any,
    auth: boolean = true,
    routerOpt?: Router.IRouterOptions | undefined) {
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
  public Listen(
    port?: number | undefined,
    hostname?: string | undefined,
    backlog?: number | undefined,
    listeningListener?: (() => void) | undefined
  ): Server {
    return this.app.listen(
      port,
      hostname,
      backlog,
      listeningListener
    );
  }
}
