const functions = require("firebase-functions");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const {
  getAllUsers,
  getUserDetail,
  addStatus,
  getUsers,
  getSearchResults,
} = require("./handlers/users");
app.get("/hrmanagement/users", getAllUsers);
app.get("/hrmanagement/users/:type", getUsers);
app.get("/hrmanagement/user/:id", getUserDetail);
app.get("/hrmanagement/search/:query", getSearchResults);

app.post("/hrmanagement/user/:id", addStatus);
exports.api = functions.region("asia-south1").https.onRequest(app);
