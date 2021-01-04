const { admin, db } = require("./admin");
module.exports = (req, res, next) => {
  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else {
    console.error("No id token ", "" + req.headers.authorization);
    return res.status(403).json({ error: "Unauthorized" });
  }
  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      req.user = decodedToken;
      return db.doc(`users/${req.user.uid}`).get();
    })
    .then((data) => {
      req.user.username = data.data().username;
      req.user.imageUrl = data.data().userimage;
      return next();
    })
    .catch((error) => {
      console.error("Error while verifying token", error);
      return res.status(403).json(error);
    });
};
