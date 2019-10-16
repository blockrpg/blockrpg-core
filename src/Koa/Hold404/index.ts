import Koa from 'koa';
import { Rsp } from '../Rsp';

export default async (
  ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext>,
  next: () => Promise<any>,
) => {
  Rsp.Error(ctx, 404, '资源不存在😂');
};
