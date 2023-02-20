#!/usr/bin/env node
const pg = require("pg");
const getDbConnectionString = require("../functions/getDbConnectionString");
const config = require("../libretodo.config");

const { dbName } = config.db;

console.log(dbName);

const pool = new pg.Pool({
  connectionString: getDbConnectionString(config),
});

pool.connect(async (err, client, release) => {
  if (err) {
    console.log(err);
    process.exit(1);
  } else {
    const databaseExists = await client.query(
      `select datname from pg_catalog.pg_database where datname=$1;`,
      [dbName]
    );
    if (databaseExists) {
      const tableQuery = await client.query(
        "select table_name from information_schema.tables where table_schema = 'public';"
      );
      const userTableExists =
        tableQuery.rows.map((x) => x.table_name).indexOf("userinfo") !== -1;
      console.log(userTableExists);
      if (userTableExists === false) {
        const queryResult = await client.query(
          "create table userinfo(username varchar(255), hashed_pw varchar(255), salt varchar(255), userid varchar(255));"
        );
        console.log(queryResult);
      }
    }
    release();
    process.exit(0);
  }
});
