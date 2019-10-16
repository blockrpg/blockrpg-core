// 携带状态，返回值，消息的返回值类型（泛型类）
export class Rtv<T> {
  private isSuccess: boolean = false;
  private object: T | null = null;
  private message: string = '';

  public constructor(
    isSuccess: boolean = false,
    object: T | null = null,
    message: string = '',
  ) {
    this.isSuccess = isSuccess;
    this.object = object;
    this.message = message;
  }

  public get IsSuccess(): boolean {
    return this.isSuccess;
  }

  public get Object(): T {
    return this.object as T;
  }

  public get Message(): string {
    return this.message;
  }

  public static Success<T>(object: T | null = null, message: string = ''): Rtv<T> {
    return new Rtv(true, object, message);
  }

  public static Fail<T>(message: string = '', object: T | null = null): Rtv<T> {
    return new Rtv(false, object, message);
  }
}
