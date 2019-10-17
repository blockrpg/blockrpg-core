
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
