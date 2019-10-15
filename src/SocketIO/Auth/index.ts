// 应用于SocketIO的基于Session的权限拦截中间件
import SocketIO from 'socket.io';
import Cookie from 'cookie';
import { Session } from '../../Session';

const errMsg = '未授权，无法访问此服务';

export default async (socket: SocketIO.Socket, next: (err?: any) => void) => {
  const cookieText: string = socket.request.headers.cookie || '';
  const session = Cookie.parse(cookieText)['session'];
  if (session) {
    const result = await Session.Check(session);
    if (result) {
      // Scoket.IO连接成功
      next();
    } else {
      next(new Error(errMsg));
    }
  } else {
    next(new Error(errMsg));
  }
};
