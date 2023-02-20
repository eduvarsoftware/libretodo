const pg = require("pg");
const getDbConnectionString = require("./getDbConnectionString");
const config = require("../libretodo.config");
const tslog = require("./timeStampedLog");

const connectToDatabase = () => {
  const pgConnectionPool = new pg.Pool({
    connectionString: getDbConnectionString(config),
  });
  pgConnectionPool.connect((err, client, release) => {
    if (err) {
      tslog(err);
      process.exit(1);
    } else {
      tslog("Connected to database");
      global.pgClient = client;
      global.pgRelease = release;
      return;
    }
  });
};

module.exports = connectToDatabase;
