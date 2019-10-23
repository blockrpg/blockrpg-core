
export const QUERY_ROAMER = `
  SELECT
    CONVERT(id + 10000, CHAR) AS 'account',
    name,
    image,
    x,
    y,
    dir,
    ges
  FROM
    player
  WHERE
    CONVERT(id + 10000, CHAR) = ?
`;

export const UPDATE_ROAMER = `
  UPDATE
    player
  SET ?
  WHERE
    CONVERT(id + 10000, CHAR) = ?
`;
