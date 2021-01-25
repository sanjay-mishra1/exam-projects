const functions = require("firebase-functions");
const express = require("express");
const app = express();
const cors = require("cors");
// const runtimeOpts = {
//   timeoutSeconds: 300,
//   memory: "1GB",
// };
const {
  getSearchResults,
  getAuthors,
  getBook,
  getAuthor,
  getBooks,
} = require("./handlers/books");
// app.get("/bookrepo/create-authors", createAuthors);
// app.get("/bookrepo/create-books", addBooksToFirestore);
// app.get("/bookrepo/test", addBooksToFirestore);
app.get("/bookrepo/books", getBooks);
app.get("/bookrepo/book/:bookId", getBook);

app.get("/bookrepo/author/:name", getAuthor);
app.get("/bookrepo/authors/", getAuthors);
app.post("/bookrepo/search/:query", getSearchResults);
app.post("/bookrepo/search/", getSearchResults);

exports.api = functions
  // .runWith(runtimeOpts)
  .region("asia-south1")
  .https.onRequest(app);
