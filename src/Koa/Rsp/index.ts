import Koa from "koa";

export class Rsp {
  // 操作成功响应
  public static Success(
    ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext>,
    object: any = undefined,
    message: string | undefined = undefined,
    extParams: any = undefined,
  ): void {
    const result = {
      code: 200,
      success: true,
      object: object,
      message: message,
      extParams: extParams,
    };
    ctx.status = result.code;
    ctx.body = result;
  }
  // 操作失败响应
  public static Fail(
    ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext>,
    message: string | undefined = undefined,
    object: any = undefined,
    extParams: any = undefined,
  ): void {
    const result = {
      code: 200,
      success: false,
      object: object,
      message: message,
      extParams: extParams,
    };
    ctx.status = result.code;
    ctx.body = result;
  }
  // 请求错误响应
  public static Error(
    ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext>,
    code: number = 500,
    message: string | undefined = undefined,
    object: any = undefined,
    extParams: any = undefined,
  ): void {
    if (!message && !object && !extParams) {
      ctx.status = code;
    } else {
      const result = {
        code: code,
        success: false,
        object: object,
        message: message,
        extParams: extParams,
      };
      ctx.status = result.code;
      ctx.body = result;
    }
  }
}