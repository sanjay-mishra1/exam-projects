const functions = require("firebase-functions");
const FBAuth = require("./util/fbAuth");
const express = require("express");
const app = express();
const cors=require('cors');
app.use(cors());
const {
  signup,
  login,
  getUserDetails,
  getOtherUserDetails,
  markNotificationRead,
  getNotifications,
  getUserContacts
} = require("./handlers/user");
const {
  getAllTransactions,
  addTransaction,
  requestTransaction,
  getTransactionsDetail,
} = require("./handlers/transaction");

//user
app.post("/login", login);
app.post("/signup", signup);
app.get("/user", FBAuth, getUserDetails);
app.get("/users",FBAuth,getUserContacts);
app.get("/user/:uid", FBAuth, getOtherUserDetails);
app.post("/notifications", FBAuth, markNotificationRead);
app.get("/notifications", FBAuth, getNotifications);

//transaction
app.post("/transaction", FBAuth, addTransaction);
app.get("/transactions", FBAuth, getAllTransactions);
app.post("/transaction/request", FBAuth, requestTransaction);

app.get("/transaction/:tid", FBAuth, getTransactionsDetail);

exports.api = functions.region("asia-south1").https.onRequest(app);
