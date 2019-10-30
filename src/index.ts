import { Point } from "./Point";
import { Space } from "./Space";
import { Rect } from "./Rect";
import { Session } from "./Session";
import { Config } from "./Config";
import * as SocketIO from "./SocketIO";
import * as Koa from "./Koa";
import { Rtv } from './Rtv';
import { Password } from './Password';
import { GridMeta } from "./Model/MapBlock/Entity/GridMeta";

async function main() {
  const grid = new GridMeta({
    resId: 0,
    resNum: 1,
    passMask: 1,
  });
  console.log(grid.Pass(new Point(0, 0)));
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
  Password,
}
