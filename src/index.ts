import { Point } from "./Point";
import { Space } from "./Space";
import { Rect } from "./Rect";
import { Session } from "./Session";
import { Config } from "./Config";
import * as SocketIO from "./SocketIO";
import * as Koa from "./Koa";
import { Rtv } from './Rtv';
import { Player } from './Player';

const p = new Player();
console.log(p.JsObj);

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
