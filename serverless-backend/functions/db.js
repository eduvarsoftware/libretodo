const qexec = require("./qexec");

const formatLists = (x) => {
  const rv = {};
  for (let i of x) {
    if (rv.hasOwnProperty(i.list_id)) {
      rv[i.list_id].listItems.push(i.list_item);
    } else {
      rv[i.list_id] = {
        listId: i.list_id,
        listName: i.list_name,
        listItems: [i.list_item],
      };
    }
  }
  return Object.values(rv);
};

const createList = async (username, listName, listId, listItems = []) => {
  const constructQuery = (n) => {
    const fmt = Array(n)
      .fill(0)
      .map((_, i) => `($1, $${i + 2})`)
      .join(", ");
    const q = `insert into libretodo_listcontent(list_id, list_item) values ${fmt};`;
    return q;
  };

  await qexec(
    "insert into libretodo_listdata(username, list_name, list_id) values($1,$2,$3)",
    [username, listName, listId]
  );
  console.log("inserting list items");
  if (listItems.length > 0) {
    await qexec(constructQuery(listItems.length), [listId, ...listItems]);
  }
};

//==============================

const checkListExistence = async (listId) => {
  const res = await qexec(
    "select * from libretodo_listdata where list_id=$1 limit 1;",
    [listId]
  );
  console.log(res);
  if (res.length) return res[0];
  else return null;
};

//===========

const checkToken = async (tokenString) => {
  if (!tokenString) return false;
  const rv = await qexec(
    "select username from libretodo_users where token=$1 limit 1;",
    [tokenString]
  );
  console.log(rv);
  if (rv.length === 0) return false;
  else return rv[0]?.username || false;
};

//===========

const getAllListsForUser = async (username) => {
  const res = await qexec(
    "select * from libretodo_listdata left join libretodo_listcontent on libretodo_listdata.list_id = libretodo_listcontent.list_id where username=$1;",
    [username]
  );

  return formatLists(res);
};

//===================

const deleteListById = async (username, listId) => {
  await qexec(
    "delete from libretodo_listdata where list_id=$1 and username=$2;",
    [listId, username]
  );
  await qexec("delete from libretodo_listcontent where list_id=$1;", [listId]);
};

//=================

const getListById = async (username, listId) => {
  const rv = await qexec(
    "select * from libretodo_listdata right join libretodo_listcontent on libretodo_listdata.list_id=libretodo_listcontent.list_id where libretodo_listdata.list_id=$1 and libretodo_listdata.username=$2;",
    [listId, username]
  );
  return formatLists(rv)[0] || [];
};

//=================

const getUserName = async (req) => {
  const token = req.headers?.authorization?.split(" ")[1];
  if (token && typeof token === "string") {
    const res = await qexec(
      "select username from libretodo_users where token=$1 limit 1;",
      [token]
    );
    if (res.length) return res[0]?.username || null;
    else return null;
  }
  return null;
};

//=================

const checkListOwnership = async (listId, username) => {
  const rv = await qexec(
    "select * from libretodo_listdata where list_id=$1 and username=$2 limit 1;",
    [listId, username]
  );
  if (rv.length > 0) return true;
  else return false;
};

//=================

const getItemsFromList = async (listId) => {
  const rv = await qexec(
    "select list_item from libretodo_listcontent where list_id=$1;",
    [listId]
  );
  return formatLists(rv)[0] || [];
};

//=================

const deleteItemFromList = async (item, listId) => {
  await qexec(
    "delete from libretodo_listcontent where list_item=$1 and list_id=$2",
    [item, listId]
  );
};

//=================

const putItemIntoList = async (item, listId) => {
  await qexec(
    "insert into libretodo_listcontent(list_item, list_id) values($1, $2);",
    [item, listId]
  );
};

//=================

const db = {
  createList,
  checkListExistence,
  checkListOwnership,
  checkToken,
  getItemsFromList,
  getAllListsForUser,
  getListById,
  deleteListById,
  deleteItemFromList,
  getUserName,
  putItemIntoList,
};

module.exports = db;
