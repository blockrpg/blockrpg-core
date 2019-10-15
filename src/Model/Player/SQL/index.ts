
// 向表中插入新的玩家
export const INSERT_PLAYER = `
  INSERT INTO
    player
  SET ?
`;

export const QUERY_PLAYER_BY_NAME = `
  SELECT
    *
  FROM
    player
  WHERE
    name = ?
`;

export const QUERY_PLAYER_BY_ID = `
  SELECT
    *
  FROM
    player
  WHERE
    id = ?
`;
