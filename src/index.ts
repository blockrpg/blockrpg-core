import { Point } from "./Point";
import { Space } from "./Space";
import { Rect } from "./Rect";
import { Session } from "./Session";
import { Config } from "./Config";
import * as SocketIO from "./SocketIO";
import * as Koa from "./Koa";
import { Rtv } from './Rtv';
import { RoamerDAL } from './Model/Roamer/DAL';
import { Roamer } from "./Model/Roamer/Entity";


async function main() {
  const newRoamer = new Roamer({
    account: '10001',
    x: 100,
    y: -23,
    dir: 1,
    ges: 1,
  });
  const roamer = await RoamerDAL.From().setRoamerToRedis(newRoamer);
  console.log(roamer);
}

main();

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
