const { admin, db } = require("../util/admin");
const config = require("../util/config");
const firebase = require("firebase");
firebase.initializeApp(config);
const { user } = require("firebase-functions/lib/providers/auth");
const {
  validateSignUpData,
  validateLoginData,
  reduceUserDetails,
} = require("../util/validators");
exports.signup = (req, res) => {
  try {
    const newUser = {
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      mobilenumber: req.body.mobilenumber,
      username: parcelCase(req.body.username),
    };
    const { valid, errors } = validateSignUpData(newUser);
    if (!valid) return res.status(400).json({ errors });
    const noImg = "no-image.png";
    let authToken = "";
    let userId;
    // TODO validate user
    db.collection(`users`)
      .where("mobilenumber", "==", `+91${newUser.mobilenumber}`)
      .get()
      .then((snap) => {
        if (!snap.empty) {
          return res
            .status(400)
            .json({ handle: `This mobile number is already used` });
        } else {
          return firebase
            .auth()
            .createUserWithEmailAndPassword(newUser.email, newUser.password)
            .then((data) => {
              userId = data.user.uid;
              return data.user.getIdToken();
            })
            .then((token) => {
              authToken = token;
              const userCredentials = {
                email: newUser.email,
                mobilenumber: `+91${newUser.mobilenumber}`,
                username: newUser.username.toLowerCase(),
                createdAt: new Date().toISOString(),
                balance: 0,
                imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
              };
              return db.doc(`/users/${userId}`).set(userCredentials);
            })
            .then(() => {
              return res.status(201).json({ token: authToken });
            })
            .catch((error) => {
              console.log(error);
              if (error.code === "auth/email-already-in-use") {
                return res.status(400).json({ email: "Email already in use" });
              } else {
                return res
                  .status(500)
                  .json({ general: "Something went wrong, please try again" });
              }
            });
        }
      });
  } catch (err) {
    console.log(err);
    res.status(501).json({ error: "Invalid data" });
  }
};
exports.login = (req, res) => {
  try {
    const user = {
      email: req.body.email,
      password: req.body.password,
    };
    const { valid, errors } = validateLoginData(user);
    if (!valid) return res.status(400).json({ errors });
    if (Object.keys(errors).length > 0) return res.status(400).json(errors);
    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        return data.user.getIdToken();
      })
      .then((token) => {
        return res.status(200).json({ token });
      })
      .catch((err) => {
        console.log(err);
        return res
          .status(403)
          .json({ gerneral: "Wrong credentials, please try again later" });
      });
  } catch (err) {
    console.error(err);
    return res.status(403).json({ error: err });
  }
};
const parcelCase = (name) => {
  return name.replace(/\w+/g, function (w) {
    return w[0].toUpperCase() + w.slice(1).toLowerCase();
  });
};
//includes user details, user notifications
exports.getUserDetails =async (req, res) => {
  const userData = {};
  console.log(req.user.uid);
 let doc1=await db.doc(`users/${req.user.uid}`)
    .get();

      userData.credentials = doc1.data();
      userData.credentials.uid=req.user.uid;
      if(req.query.type)
        return res.json(userData.credentials);
      let snap= await db
        .collection("notifications")
        .where("recipient", "==", req.user.uid)
        .where("read",'==',false)
        .get();

snap= extractSnap(snap);
userData.notifications = [];
for (const ele of snap) {
        console.log(ele);
        let data = await setUserData(ele, ele.sender, ele.id);
        userData.notifications.push(data);
      }

res.json(userData);
      // if(snap){
      //       userData.notifications = [];
      //       snap.forEach((doc) => {
      //         userData.notifications.push(doc.data());
      //       });
      //       res.json(userData);
      //     }
};
//other user details like name and image
exports.getOtherUserDetails = (req, res) => {
  db.doc(`users/${req.params.uid}`)
    .get()
    .then((doc) => {
      if (!doc.exists) return res.status(404).json({ error: "User not found" });
      let userData = doc.data();
      delete userData["balance"];
      delete userData["createdAt"];
      res.json(userData);
    });
};
exports.markNotificationRead = (req, res) => {
  let batch = db.batch();
  req.body.forEach((notificationId) => {
    const notification = db.doc(`/notifications/${notificationId}`);
    batch.update(notification, { read: true });
  });
  batch
    .commit()
    .then(() => {
      return res.json({ message: "Notifications marked read" });
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({ error: error.code });
    });
};

exports.getNotifications =async (req, res) => {
  let not = [];
let snap=await  db.collection("notifications")
    .where("recipient", "==", req.user.uid)
    .get();
 snap= extractSnap(snap);
for (const ele of snap) {
        console.log(ele);
        let data = await setUserData(ele, ele.sender, ele.id);
        not.push(data);
      }

// snap.forEach((doc) => {
//         not.push(doc.data());
//       });
      return res.json(not);
};
const extractSnap = (snap) => {
  let data = [];
  snap.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
};
const setUserData = async (data, uid, tid) => {
  let userData = await db.doc(`users/${uid}`).get();
  
  return {
    username: userData.data().username,
    imageUrl: userData.data().imageUrl,
    tid,
    ...data,
  };
};

exports.getUserContacts = (req, res) => {
  let users = [];
  db.collection("users")
    .get()
    .then((snap) => {
      snap.forEach((doc) => {
        if(doc.id !==req.user.uid)
        users.push({
          username: doc.data().username,
          imageUrl: doc.data().imageUrl,
          uid: doc.id,
        });
      });
      return res.json( users );
    });
};
