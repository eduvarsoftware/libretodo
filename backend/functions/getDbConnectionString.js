const getDbConnectionString = (config) => {
    return `postgresql://${config.db.username}:${config.db.password}@${config.db.addr}:${config.db.port}/${config.db.dbName}`;
}

module.exports = getDbConnectionString;