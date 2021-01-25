const { db } = require("../util/admin");
const config = require("../util/config");
const firebase = require("firebase");
const https = require("https");
var fs = require("fs");
const projectAddress = "Projects/BooksRepo";
firebase.initializeApp(config);

exports.getBooks = (req, res) => {
  let books = [];
  db.collection("Projects")
    .doc("BooksRepo")
    .collection("Books")
    .limit(10)
    .get()
    .then((snap) => {
      snap.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id });
      });
      res.json({ books });
    });
};

exports.getBook = (req, res) => {
  if (req.params.bookId) {
    db.doc(`${projectAddress}/Books/${req.params.bookId}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return res.json({ ...doc.data(), id: doc.id });
        } else res.status(404).json({ error: "Book not found" });
      });
  } else res.status(501).json({ Error: "Invalid data" });
};
exports.getAuthors = (req, res) => {
  let authors = [];
  db.collection("Projects")
    .doc("BooksRepo")
    .collection("Authors")
    .limit(20)
    .get()
    .then((snap) => {
      snap.forEach((doc) => {
        authors.push(doc.data());
      });
      res.json({ authors });
    });
};
exports.getAuthor = (req, res) => {
  if (req.params.name) {
    let author = {};
    db.collection("Projects")
      .doc("BooksRepo")
      .collection("Authors")
      .where("name", "==", req.params.name)
      .get()
      .then((snap) => {
        if (!snap.empty) {
          snap.forEach((doc) => {
            if (doc.exists) {
              author = { ...doc.data(), id: doc.id };
              // return res.json({ ...doc.data(), id: doc.id });
              db.collection("Projects")
                .doc("BooksRepo")
                .collection("Books")
                .where("authors", "array-contains", req.params.name)
                .get()
                .then((snap) => {
                  author.booksList = [];
                  if (!snap.empty) {
                    snap.forEach((doc) => {
                      author.booksList.push({ ...doc.data(), id: doc.id });
                    });
                  }
                  res.json({ ...author });
                });
            } else res.status(404).json({ error: "Author not found" });
          });
        } else res.status(404).json({ error: "Author not found" });
      });
  } else res.status(501).json({ error: "Invalid data" });
};
const parcelCase = (name) => {
  return name.replace(/\w+/g, function (w) {
    return w[0].toUpperCase() + w.slice(1).toLowerCase();
  });
};
//get search result with query
exports.getSearchResults = async (req, res) => {
  try {
    var filter = req.body.filter;
    if (
      filter === null ||
      Object.keys(filter) === 0 ||
      !filter.type ||
      !filter.attributes ||
      !filter.limit ||
      !filter.limit > 21
    )
      return res.status(400).json({ error: "No filters found" });
    console.log("filter", filter);
    let searchResult = [];
    var searchKey = parcelCase(req.params.query);
    var count = 0;
    var searchListIds = [];
    var fireQuery = db
      .collection("Projects")
      .doc("BooksRepo")
      .collection(filter.type);
    filter.attributes.forEach((item) => {
      var key = item;
      if (key.includes("price")) {
        if (key.includes("low")) fireQuery = fireQuery.orderBy("price", "asc");
        else fireQuery = fireQuery.orderBy("price", "desc");
      } else if (key.includes("average_rating"))
        fireQuery = fireQuery
          .where("average_rating", ">=", parseInt(key.split("-")[1]));
          // .where("average_rating", "<=", key.split("-")[2]);
      else if (key.includes("ratings_count"))
        fireQuery = fireQuery.orderBy("ratings_count", "desc");
      else if(key.includes("alphabetical")){
        fireQuery = fireQuery.orderBy("title", "asc");
      }
      else if(key.includes("language_code")){
        fireQuery=fireQuery.where("language_code","==", key.split('-')[1]); 
      }
      else {
        if (!searchKey || searchKey === "") throw Error("No search key");
        else {
          if (key.includes("authors"))
            fireQuery = fireQuery.where("authors", "array-contains", searchKey);
          else
            {fireQuery = fireQuery
                          .orderBy(key)
                          .startAt(searchKey)
                          .endAt(searchKey + "\uf8ff");

                        }
        }
      }
    });
    fireQuery
      .limit(filter.limit)
      .get()
      .then((snap) => {
        count++;
        if (!snap.empty)
          snap.forEach((doc) => {
            if (!searchListIds.includes(doc.id)) {
              searchResult.push({ ...doc.data(), id: doc.id });
              searchListIds.push(doc.id);
            }
          });
        return res.json(searchResult);
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
/*exports.getSearchResults = async (req, res) => {
  try {
    var filter = req.body.filter;
    if (!Array.isArray(filter) || filter === null || filter.length === 0)
      return res.status(400).json({ error: "No filters found" });
    console.log("filter", filter);
    let searchResult = [];
    var searchKey = req.params.query;
    var count = 0;
    var searchListIds = [];
    var fireQuery = db
      .collection("Projects")
      .doc("BooksRepo")
      .collection("Books");
    filter.forEach((item) => {
      var key = item;
      var query;
      if (key.includes("price")) {
        if (key.includes("low")) query = fireQuery.orderBy("price", "asc");
        else query = fireQuery.orderBy("price", "desc");
      } else if (key.includes("average_rating"))
        query = fireQuery
          .where("average_rating", ">=", key.split("-")[1])
          .where("average_rating", "<=", key.split("-")[2]);
      else
        query = fireQuery
          .orderBy(key)
          .startAt(searchKey)
          .endAt(searchKey + "\uf8ff");
      query.get().then((snap) => {
        count++;
        if (!snap.empty)
          snap.forEach((doc) => {
            if (!searchListIds.includes(doc.id)) {
              searchResult.push({ ...doc.data(), id: doc.id });
              searchListIds.push(doc.id);
            }
          });
        if (count === filter.length) return res.json(searchResult);
      });
    });
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};*/
//average_rating-4.5-4.0
//search users by candidate name
