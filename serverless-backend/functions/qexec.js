const tslog = require("./timeStampedLog");

const qexec = async (queryString, subsArray = []) => {
  console.log(queryString, subsArray);
  if (global.pgClient) {
    const queryResult = await pgClient.query(queryString, subsArray);
    const rows = await queryResult.rows;
    return rows;
  } else {
    tslog("pgClient not set");
    return [];
  }
};

module.exports = qexec;
