
// 矩形查询SQL语句
export const QUERY_RECT = `
  SELECT
    *
  FROM
    mapBlock
  WHERE
    mapId = ? and
    x >= ? and
    y >= ? and
    x <= ? and
    y <= ?
`;

// 新增Block语句
export const INSERT_BLOCK = `
  INSERT INTO
    mapBlock
  SET ?
`;
// 删除Block语句
export const DELETE_BLOCK = `
  DELETE FROM
    mapBlock
  WHERE
    mapId = ? &&
    x = ? &&
    y = ?
`;
// 更新Block语句（这里只更新resData）
export const UPDATE_BLOCK = `
  UPDATE
    mapBlock
  SET
    resData = ?
  WHERE
    mapId = ? &&
    x = ? &&
    y = ?
`;
// 查询Block语句
export const QUERY_BLOCK = `
  SELECT
    mapId,
    x,
    y,
    resData
  FROM
    mapBlock
  WHERE
    mapId = ? &&
    x = ? &&
    y = ?
  LIMIT 1
`;
