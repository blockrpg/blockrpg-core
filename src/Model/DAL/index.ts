import DBPool from '../../DBPool';

// 所有DAL的基类
export class DAL {
  // 数据库链接
  private conn: any = null;
  // 获取传入的数据库连接
  public get Connection(): any {
    return this.conn;
  }
  // 如果传入了数据库连接的话则使用数据库连接
  // 否则的话将使用数据库连接池
  public get DBCaller(): any {
    if (this.conn) {
      return this.conn;
    } else {
      return DBPool;
    }
  }
  // 构造函数，可通过一个数据库连接构造DAL层
  public constructor(conn: any = null) {
    this.conn = conn;
  }
}
