import { Point } from "./Point";
import { Space } from "./Space";
import { Rect } from "./Rect";
import { Session } from "./Session";
import { Config } from "./Config";
import * as SocketIO from "./SocketIO";
import * as Koa from "./Koa";
import { Rtv } from './Rtv';
import { Player } from './Model/Player/Entity';
import { PlayerDAL } from './Model/Player/DAL';
import { playerRegisterBLL, playerLoginBLL } from './Model/Player/BLL';

async function test() {
  const rtv = await playerRegisterBLL('习近平31', 'gushihao');
  if (rtv.IsSuccess) {
    console.log(rtv.Object.Account);
  }
  const sss = await playerLoginBLL('10009', 'gushihao1991');
  console.log(sss);
}

test();

export {
  Point,
  Space,
  Rect,
  Session,
  Config,
  SocketIO,
  Koa,
  Rtv,
}
