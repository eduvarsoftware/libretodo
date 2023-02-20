#!/usr/bin/env node
import fetch from "node-fetch";

const rootUrl = "http://localhost:3001";

const reset = async () => {
  const res = await fetch(`${rootUrl}/testreset`);
  console.log("reset status : ", res.status);
};

const main = async () => {
  await reset();
};

main();
