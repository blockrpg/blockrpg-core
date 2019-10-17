const configJson: any = require(`${process.cwd()}/config.json`);

// 导出项目配置信息
// 项目配置信息Json文件存放在Node工作目录下
export const Config =  configJson;
