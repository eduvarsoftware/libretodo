#!/usr/bin/env node
import fetch from "node-fetch";
import crypto from "crypto";

const rf = (n) => crypto.randomBytes(n).toString("hex");

const rootUrl = "http://localhost:3001";
const baseUrl = `${rootUrl}/api`;

let token = null;
let username = null;

const resolve = (x) => `${baseUrl}${x}`;

const testRegisterUser = async () => {
  const url = resolve("/users");
  // const requestObj = {
  //   username: "a1",
  //   password: "a2",
  // };
  const requestObj = {
    username: rf(5),
    password: rf(5),
  };
  username = requestObj.username;
  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestObj),
  });
  const rval = await resp.json();
  console.log(rval);
  token = rval.token;
  return;
};

const testCreateList = async () => {
  const url = resolve("/lists");
  const requestObj = {
    listId: "ls1",
    listName: "ls1",
    listItems: ["i1", "i2", "i3"],
  };
  // const requestObj = {
  //   listId: rf(5),
  //   listName: rf(5),
  //   listItems: [rf(5), rf(5), rf(5)],
  // };
  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${token}`,
    },
    body: JSON.stringify(requestObj),
  });
  console.log("status :", resp.status);

  const rval = await resp.json();
  console.log(rval);
};

const testGetAllLists = async () => {
  const resp = await fetch(resolve("/lists"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${token}`,
    },
  });
  console.log("status :", resp.status);

  const rval = await resp.json();
  console.log(rval);
  return rval;
};

const reset = async () => {
  const res = await fetch(`${rootUrl}/testreset`);
  console.log("reset status : ", res.status);
};

const testDeleteList = async (listId) => {
  const resp = await fetch(resolve(`/lists/${listId}`), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${token}`,
    },
  });
  console.log("status :", resp.status);

  const rval = await resp.json();
  console.log(rval);
};

const testGetList = async (listId) => {
  const resp = await fetch(resolve(`/lists/${listId}`), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${token}`,
    },
  });
  console.log("status :", resp.status);

  const rval = await resp.json();
  console.log(rval);

  return rval;
};

const testPutItemIntoList = async (listId, item) => {
  const resp = await fetch(resolve(`/lists/${listId}/items`), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${token}`,
    },
    body: JSON.stringify({ item }),
  });
  console.log("status :", resp.status);

  const rval = await resp.json();
  console.log(rval);
};

const testDeleteItemFromList = async (listId, item) => {
  const resp = await fetch(resolve(`/lists/${listId}/items`), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${token}`,
    },
    body: JSON.stringify({ item }),
  });
  console.log("status :", resp.status);

  const rval = await resp.json();
  console.log(rval);
}

const main = async () => {
  await reset();  
  await testRegisterUser();
  await testCreateList();
  const listId = (await testGetAllLists()).lists[0].listId;
  console.log("listId : ", listId);
  console.log("cl1", await testGetList(listId));
  await testPutItemIntoList(listId, "newitem1");
  await testPutItemIntoList(listId, "newitem2");
  await testPutItemIntoList(listId, "newitem3");
  await testDeleteItemFromList(listId, "newitem2");
  console.log("cl2", await testGetList(listId));
  // await testDeleteList(listId);
};

/* 
lc = list container, li = list items

create lc
read lc
update lc
delete lc

create li
read li
update li
delete li
*/

main();
