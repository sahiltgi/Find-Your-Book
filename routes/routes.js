const ObjectID = require("mongodb").ObjectID;
const AUTHENTICATION = "authenticate-user";
const RATING = "rating-books";

module.exports = function(app, db) {
  /* ----------------------------------------AUTHENTICATION----------------------------------------- */

  //   POST api for creating signup for new user
  app.post("/api/signup", (request, response, next) => {
    const body = request.body;
    // if (
    //   body.username == null ||
    //   body.email == null ||
    //   body.password == null ||
    //   body.confirmpassword == null
    // ) {
    //   var errr = new Error("All fields are required");
    //   errr.status = 400;
    //   response.send("All fields are required");
    //   return next(errr);
    // }
    // if (body.password != body.confirmpassword) {
    //   var err = new Error("Password doesn't match");
    //   err.status = 400;
    //   response.send("password dont match");
    //   return next(err);
    // }
    if (
      body &&
      body.username &&
      body.email &&
      body.password &&
      body.confirmpassword
    ) {
      const firsttime = db.collection(AUTHENTICATION);
      firsttime
        .insert({
          username: body.username,
          email: body.email,
          password: body.password,
          confirmpassword: body.confirmpassword
        })
        .then(result => {
          response.send({
            status: "success",
            message: "user registration successful"
          });
          console.log(result);
        })
        .catch(err => {
          response.status(400).send({
            status: "error",
            message: err
          });
          console.log(err);
        });
    } else {
      response.status(400).send({
        status: "error",
        message: "all the fields should be filled"
      });
    }
  });

  // POST api for logging the existing user
  app.post("/api/login", (request, response, next) => {
    const body = request.body;
    let email = body.email;
    let password = body.password;
    const firsttime = db.collection(AUTHENTICATION);
    firsttime.findOne({ email: email }, function(err, user) {
      if (body.email == null || body.password == null) {
        var errr = new Error("All fields are required");
        errr.status = 400;
        response.send("All fields are required");
        return next(errr);
      }
      if (err) {
        return next(err);
      } else if (!user) {
        return response.status(400).send({
          status: "error",
          message: "user does not exist"
        });
      } else {
        if (user.password == password) {
          return response.send({
            status: "success",
            message: "Successfully logged in"
          });
        } else {
          return response.status(400).send({
            status: "error",
            message: "Wrong Password"
          });
        }
      }
      request.session.user = email;
      return response.send("Login Successful");
    });
  });

  /*------------------------------------------------Ratings-------------------------------------------------- */
  // app.put("/api/rating/:userId", (request, response) => {
  //   const body = request.body;
  //   let Rating = body.Rating;
  //   let Book = body.Book;
  //   if (body) {
  //     const rateBook = db.collection(RATING);
  //     rateBook.insertOne({ Rating: Rating }, { Book: Book });
  //   }
  // });

  // app.get("/api/rating/:userId?", (request, response) => {
  //   const collection = db.collection(RATING);
  //   const userId = request.params.userId;
  // });
};
