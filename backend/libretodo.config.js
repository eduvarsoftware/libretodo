module.exports = {
  ssl: {
    key: "/opt/ssl/privkey.pem",
    cert: "/opt/ssl/cert.pem",
  },
  production: {
    addr: "0.0.0.0",
    port: 443,
    domain: "libretodo.com",
  },
  dev: {
    addr: "127.0.0.1",
    port: 3001,
    dbEnabled: false,
  },
  db: {
    username: "myusername",
    password: "mypassword",
    addr: "127.0.0.1",
    port: 5432,
    dbName: "mydb",
  },
};
