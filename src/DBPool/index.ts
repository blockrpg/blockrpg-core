import BlueBird from 'bluebird';
const MySQL2 = require('mysql2/promise');
import { Config } from '../Config';

const Pool: any = MySQL2.createPool({
  ...Config['mysql'],
  Promise: BlueBird,
});

// 导出默认数据库连接池
// 通常一个项目内使用这一个默认的数据库连接池就可以满足需求
export default Pool;
