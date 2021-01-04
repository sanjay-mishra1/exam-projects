const { admin, db } = require("../util/admin");
const config = require("../util/config");
const firebase = require("firebase");
const {
  sortJson,
  validateNewTransaction,
  validateNewRequest,
} = require("../util/validators");
const { request } = require("express");
exports.getAllTransactions = async (req, res) => {
  try {
    let userTransactions = [];
    console.log(req.user.uid);
    let snap1 =  db
      .collection("transactions")
      .where("fromUID", "==", req.user.uid)
      .orderBy("createdAt", "desc");
     if(req.query.type && req.query.type==='recent') 
        snap1=snap1.limit(5);
      snap1=await snap1.get();
    snap1 = extractTransactionSnap(snap1,'sender');

    if (!snap1.empty)
      for (const ele of snap1) {
        console.log(ele);
        let data = await setTransactionData(ele, ele.toUID, ele.id);
        userTransactions.push(data);
      }

    let snap2 =  db
      .collection("transactions")
      .where("toUID", "==", req.user.uid)
      .orderBy("createdAt", "desc");
      if(req.query.type && req.query.type==='recent') 
        snap2=snap2.limit(5);
     snap2=await snap2.get();
    snap2 = extractTransactionSnap(snap2,'receiver');

    if (!snap2.empty)
      for (const ele of snap2) {
        console.log(ele);
        let data = await setTransactionData(ele, ele.toUID, ele.id);
        userTransactions.push(data);
      }
      let finalData=userTransactions.sort(sortJson("createdAt"));
    if(req.query.type && req.query.type==='recent') 
          finalData.length=5;
    return res.json(finalData);
  } catch (err) {
    console.log(err);
    res.status(501).json({ error: "An unexpected error occurred" });
  }
};
const extractTransactionSnap = (snap,type) => {
  let data = [];
  snap.forEach((doc) => {
    data.push({ id: doc.id,type, ...doc.data() });
  });
  return data;
};
// add new payment by a user
exports.addTransaction = (req, res) => {
  const transaction = {
    fromUID: req.user.uid,
    toUID: req.body.uid,
    amount: req.body.amount,
    message: req.body.message,
  };
  console.log('Received data',transaction);
  const toUserData = {};
  const { valid, errors } = validateNewTransaction(transaction);
  console.log(errors,valid);
  if (!valid) return res.status(400).json({ errors });
  let userData = {};
  let tid;
  db.doc(`users/${transaction.fromUID}`)
    .get().then((doc) => {
      if (!doc.exists) return res.status(404).json({ error: "User not found" });
      console.log('sender data',doc.data());
      if (doc.data().balance < transaction.amount)
        return res.status(400).json({ errors: {amount:"Insufficient balance"} });
      userData = doc.data();
      return db.doc(`users/${transaction.toUID}`).get();
    })
    .then((doc) => {
      if (!doc.exists) return res.status(404).json({ error: "User not found" });
      toUserData.balance = doc.data().balance;
      toUserData.username = doc.data().username;
      toUserData.mobilenumber = doc.data().mobilenumber;
      transaction.createdAt = new Date().toISOString();
      transaction.status = "success";
      transaction.statusMessage = "Money send successfully";
      console.log('data to store',transaction);
      return db.collection("transactions").add(transaction);
    })
    .then((doc) => {
      tid=doc.id;
      userData.balance -= transaction.amount;
      return db.doc(`users/${transaction.fromUID}`).update(userData);
    })
    .then((doc) => {
      toUserData.balance += transaction.amount;
      return db.doc(`users/${transaction.toUID}`).update(toUserData);
    })
    .then((d) => {
      res.json({ message: "Money send successfully",tid:tid,username:toUserData.username,mobilenumber:toUserData.mobilenumber,amount:req.body.amount });
      sendNotification({
        type:'receiver',
        sender: req.user.uid,
    recipient: req.body.uid,
    amount: req.body.amount,
    tid,
    message: `₹${transaction.amount} received successfully`,
      });
      sendNotification({
        type:'transfer',
        sender: req.body.uid,
        tid,
    recipient: req.user.uid,
    amount: req.body.amount,
    message: `₹${transaction.amount} send successfully`,
      });
    })
    .catch((err) => {
      console.log(err)
      return res.status(500).json({ error: "An error occurred " });
    });
};

//request the payment
exports.requestTransaction = async (req, res) => {
  const request = {
    
    sender: req.user.uid,
    recipient: req.body.uid,
    amount: req.body.amount,
    message: req.body.message,
  };
  console.log(request);
  try {
    const { valid, errors } = validateNewRequest(request);
    if (!valid) return res.status(400).json({ errors });
    let senderDoc = await db.doc(`users/${request.recipient}`).get();
    if (!senderDoc.exists)
      return res.status(404).json({ error: "Recipient not found" });
    let receiverDoc =await db.doc(`users/${request.sender}`).get();
    if (!receiverDoc.exists)
      return res.status(404).json({ error: "Sender not found" });

    // request.createdAt = new Date().toISOString();
    request.type = "request";

    await sendNotification(request);
    return res.json({ message: "Request send successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred" });
  }
};
const sendNotification = async (data) => {
  data.read=false;
  data.createdAt = new Date().toISOString();
  db.collection("notifications")
    .add(data)
    .then(() => {
      return;
    })
    .catch((err) => {
      throw err;
    });
};
// get a transaction details
exports.getTransactionsDetail = async (req, res) => {
  let doc = await db.doc(`transactions/${req.params.tid}`).get();
  if (
    doc.exists &&
    (doc.data().fromUID === req.user.uid || doc.data().toUID === req.user.uid)
  ) {
    let uid;
    let type= doc.data().fromUID === req.user.uid? 'sender':'receiver';
    if (req.user.uid !== doc.data().fromUID) uid = doc.data().fromUID;
    else uid = doc.data().toUID;
    let tData = await setTransactionData(doc.data(), uid, doc.id);
    tData.type=type;
    res.json(tData);
  } else return res.status(501).json({ error: "Invalid transaction request" });
};
const setTransactionData = async (data, uid, tid) => {
  let userData = await db.doc(`users/${uid}`).get();
  delete data["toUID"];
  delete data["fromUID"];
  return {
    username: userData.data().username,
    imageUrl: userData.data().imageUrl,
    mobilenumber:userData.data().mobilenumber,
    tid,
    ...data,
  };
};
