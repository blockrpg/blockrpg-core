import BlueBird from 'bluebird';
const MySQL2 = require('mysql2/promise');
import { Config } from '../Config';

const Pool: any = MySQL2.createPool({
  ...Config['mysql'],
  Promise: BlueBird,
});

export default Pool;
