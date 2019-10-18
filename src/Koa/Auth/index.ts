import Koa from 'koa';
import { Rsp } from '../Rsp';
import { Session } from '../../Session';

const errMsg = '未登录，无法访问😡';

export default async (
  ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext>,
  next: () => Promise<any>,
) => {
  // 从cookie里面获取session
  const session = (ctx.cookies.get('session') || '').trim();
  if (session) {
    const result = await Session.Check(session);
    if (result) {
      // 回填整理好的session
      ctx.cookies.set('session', session, {
        httpOnly: false,
      });
      return next();
    } else {
      Rsp.Error(ctx, 401, errMsg);
    }
  } else {
    Rsp.Error(ctx, 401, errMsg);
  }
};
