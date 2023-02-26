#!/usr/bin/env node
const serverlessHttp = require("serverless-http");
const express = require("express");

const cors = require("cors");
const bcryptjs = require("bcryptjs");

const requestLogger = require("./middleware/requestLogger");
const checkAuth = require("./middleware/checkAuth");

const tslog = require("./functions/timeStampedLog");
const generateToken = require("./functions/generateToken");
const qexec = require("./functions/qexec");
const connectToDatabase = require("./functions/connectToDatabase");
const db = require("./functions/db");

connectToDatabase();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/", requestLogger);

app.get("/api/", (_, res) => res.send("OK"));

app.post("/api/users", async (req, res) => {
  tslog("r1", req.body);
  if (typeof req.body === "object" && req.body.username && req.body.password) {
    tslog("r2", req.body);
    const { username, password } = req.body;
    const queryResult = await qexec(
      "select username,hashed_pw from libretodo_users where username=$1 limit 1;",
      [username]
    );
    tslog(queryResult);
    if (queryResult.length) {
      tslog("queryResult = ", queryResult);
      if (bcryptjs.compareSync(password, queryResult[0].hashed_pw)) {
        const [token, texp] = generateToken();

        await qexec(
          "update libretodo_users set token=$1, token_expires_at=$2 where username=$3;",
          [token, texp, username]
        );
        return res.json({ token, username });
      } else {
        return res.status(401).json({ message: "Unauthorized" });
      }
    } else {
      const [token, texp] = generateToken();
      const salt = bcryptjs.genSaltSync();
      const hpw = bcryptjs.hashSync(password, salt);

      await qexec(
        "insert into libretodo_users(username, hashed_pw, salt, token, token_expires_at) values($1, $2, $3, $4, $5)",
        [username, hpw, salt, token, texp]
      );
      return res.json({
        token,
        username,
      });
    }
  } else {
    res.status(400).json({ message: "Invalid Request" });
  }
});

app.use("/api/lists", checkAuth);

app.get("/api/lists", async (req, res) => {
  const username = await db.getUserName(req);
  const queryResults = (await db.getAllListsForUser(username)) || [];
  res.json({ lists: queryResults });
});

const listFormatCheck = (x) =>
  typeof x === "object" && x.listName && x.listId && Array.isArray(x.listItems);

const createListWrap = async (rb, username) => {
  const { listName, listId, listItems } = rb;
  const exists = await db.checkListExistence(listId);
  if (exists) return false;
  tslog("clwrap", username, listName, listId, listItems);
  await db.createList(username, listName, listId, listItems);
  return true;
};

app.post("/api/lists", async (req, res) => {
  tslog("r1", req.body);
  let rk = null;
  const username = await db.getUserName(req);
  tslog("username", username);

  if (Array.isArray(req.body) && req.body.every(listFormatCheck))
    rk = req.body.map((x) => createListWrap(x, username)).every((x) => x);
  else if (listFormatCheck(req.body)) rk = createListWrap(req.body, username);

  if (rk) return res.status(200).json({ message: "OK" });
  else return res.status(400).json({ message: "Bad Request" });
});

app.get("/api/lists/:listId", async (req, res) => {
  if (req.params.listId) {
    const username = await db.getUserName(req);
    const rv = await db.getListById(username, req.params.listId);
    return res.status(200).json({ list: rv });
  } else return res.status(400).json({ message: "Bad Request" });
});

app.delete("/api/lists/:listId", async (req, res) => {
  if (req.params.listId) {
    const username = await db.getUserName(req);
    await db.deleteListById(username, req.params.listId);
    return res.status(200).json({ message: "OK" });
  } else return res.status(400).json({ message: "Bad Request" });
});

app.get("/api/lists/:listId/items", async (req, res) => {
  if (req.params.listId) {
    const username = await db.getUserName(req);
    const listId = req.params.listId;
    const ownership = await db.checkListOwnership(listId, username);
    if (ownership) {
      const rv = await db.getItemsFromList(listId);
      return res.status(200).json({ items: rv });
    } else return res.status(401).json({ message: "Unauthorized" });
  } else return res.status(400).json({ message: "Invalid Request" });
});

app.put("/api/lists/:listId/items", async (req, res) => {
  if (req.params.listId) {
    const item = req.body.item;
    const listId = req.params.listId;
    const username = await db.getUserName(req);
    const ownership = await db.checkListOwnership(listId, username);
    if (ownership) {
      await db.putItemIntoList(item, listId);
      return res.status(200).json({ message: "OK" });
    } else return res.status(401).json({ message: "Unauthorized" });
  } else return res.status(400).json({ message: "Invalid Request" });
});

app.delete("/api/lists/:listId/items", async (req, res) => {
  if (req.params.listId && req?.body?.item) {
    const item = req.body.item;
    const listId = req.params.listId;
    const username = await db.getUserName(req);
    const ownership = await db.checkListOwnership(listId, username);
    if (ownership) {
      await db.deleteItemFromList(item, listId, username);
      return res.status(200).json({ message: "OK" });
    } else return res.status(401).json({ message: "Unauthorized" });
  } else return res.status(400).json({ message: "Invalid Request" });
});

app.use((_, res, __) => res.status(404).send("ERROR 404 NOT FOUND"));

exports.handler = serverlessHttp(app);
