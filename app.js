const express = require("express");
const mongoose = require("mongoose");

const Challenges = require("./models/schema.model.js");

const app = express();
const port = 5000;

// Middleware
app.use(express.json());

// Router
const challengeRoute = require("./routes/Challenges.route.js");
// Router Middleware
app.use("/challenges", challengeRoute);

// Get Homepage
app.get("/", (req, res) => {
  return res.status(200).send("Welcome to the Server!!!");
});

// Connect to MongoDB & Listen on port 5000
mongoose
  .connect(
    "mongodb+srv://admin:AjayShankar@cluster0.7cghn.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to the DB");
    app.listen(port, () => {
      console.log(`Connected to the server on port:${port}`);
    });
  })
  .catch((error) => {
    console.log("Error occured", error);
  });
