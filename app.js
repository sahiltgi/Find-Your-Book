const express = require("express");
const middleware = require("./routes/middleware.js");
const routes = require("./routes/routes.js");
const session = require("client-sessions");
const mongodb = require("mongodb");
const DB_URI =
  "mongodb+srv://sahil00:sahil123@cluster1-f6fqs.mongodb.net/test?retryWrites=true&w=majority";

const app = express();
// const HOSTNAME = "127.0.0.1";
// const PORT = 80;
const port = process.env.PORT || 3000;
app.use(express.static("public"));

//use sessions for tracking logins
app.use(
  session({
    secret: "work hard",
    resave: true,
    saveUninitialized: false
  })
);

// defining middlewares
app.use(express.json());
app.use(middleware.preventCROS);

app.get("/", (request, response) => {
  response.sendFile(__dirname + "index.html");
});

console.log("connecting to database...");
mongodb.MongoClient.connect(DB_URI, (error, dbClient) => {
  if (error) {
    console.log("error while connecting to dbClient", error);
    return;
  }
  // on successful connection
  console.log("Successfully connected to Database");
  const database = dbClient.db("authentication");
  routes(app, database);
  app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
  });
});
