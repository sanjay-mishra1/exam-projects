const { db } = require("../util/admin");
const config = require("../util/config");
const firebase = require("firebase");
const https = require("https");
const { query } = require("express");
const projectAddress = "Projects/HRManagement";
firebase.initializeApp(config);

exports.getAllUsers = async (req, res) => {
  try{
    let users = await getUsers();
    res.json(users);}catch(err){
    res.status(500).json({ error: "An unexpected error occurred" });
            }
  // checkUserData(res, users);
};
const getUsers = async () => {
  var users = [];
  return new Promise(function (resolve, reject) {
    https
      .get(
        "https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json",
        (response) => {
          response
            .on("data", (d) => {
              users.push(d);
            })
            .on("end", function () {
              resolve(JSON.parse(users));
            });
        }
      )
      .on("error", (e) => {
        console.error(e);
        reject(e);
      });
  });
};
const checkUserData = async (res, data) => {
  console.log("data=>", data);
  for (const ele of data) {
    await db
      .doc(`${projectAddress}/users/${ele.id}`)
      .get()
      .then((doc) => {
        console.log("data=>", doc.data(), ele.id);
        if (doc.exists) {
          ele.status = doc.data().status;
          ele.lastChange = doc.data().lastChange;
        } else ele.status = "pending";
      });
  }
  if (res) return res.json(data);
  else return data;
};
//get a user details
exports.getUserDetail = async (req, res) => {
  let users = await getUsers();
  let id = req.params.id;
  console.log("id=>", id);
  var index = users.findIndex(function (item, i) {
    return item.id === id;
  });
  console.log("filterd", index);
  if (index === -1) return res.status(404).json({ error: "User not found" });
  let user = await checkUserData(null, [users[index]]);
  return res.json(user[0]);
};
//add / change status of the user

exports.addStatus = (req, res) => {
  if (req.params.id) {
    db.doc(`/${projectAddress}/users/${req.params.id}`)
      .set({ status: req.body.status, lastChange: new Date().toISOString() })
      .then((doc) => {
        res.json({ message: "Status changes successfully" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "An unexpected error occurred" });
      });
  }
};
//get users with query
exports.getUsers = async (req, res) => {
  let users = [];
  let userIds = [];
  try {
    let snap = await db
      .collection("Projects")
      .doc("HRManagement")
      .collection("users")
      .where("status", "==", req.params.type)
      .get();
    snap.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
      userIds.push(doc.id);
    });
    let allUsers = await getUsers();
    allUsers = allUsers.filter((item) => userIds.includes(item.id));

    res.json(
      allUsers.map((item) => {
        return { ...item, status: req.params.type };
      })
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};
//search users by candidate name
exports.getSearchResults = async (req, res) => {
  try {
    let query = req.params.query.trim();
    if (query && query !== "") {
      let allUsers = await getUsers();
      allUsers = allUsers.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      res.json(allUsers);
    } else return res.json([]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};
