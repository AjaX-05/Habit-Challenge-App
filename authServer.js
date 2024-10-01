require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const { use } = require("./routes/Challenges.route");

app.use(express.json());

const posts = [
  {
    username: "Aj",
    post_id: "Post 1",
  },
  {
    username: "Jx",
    post_id: "Post 2",
  },
];

let refreshTokens = [];

app.delete("/logout", (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
});

app.get("/posts", authenticateWebToken, (req, res) => {
  const post = posts.filter((post) => post.username == req.user);
  res.json({ post });
});

app.post("/token", (req, res) => {
  const userToken = req.body.token;
  if (!userToken) return res.sendStatus(401);
  if (!refreshTokens.includes(userToken)) return res.sendStatus(403);

  jwt.verify(userToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const generatedToken = generateToken(user);
    res.json({ generatedToken: generatedToken });
  });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const user = { name: username };

  const accessToken = generateToken(user);

  const refreshToken = generateRefreshToken(user);
  refreshTokens.push(refreshToken);

  res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

function generateToken(user) {
  return jwt.sign({ name: user.name }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "20s",
  });
}

function generateRefreshToken(user) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
}

function authenticateWebToken(req, res, next) {
  let authHeader = req.headers["authorization"];
  if (authHeader == null) return res.sendStatus(401);
  authHeader = authHeader.split(" ")[1];

  jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user.name;
    next();
  });
}

mongoose
  .connect
  // ""
  ()
  .then(() => {
    console.log("Connected to DB");
    app.listen(5001, () => {
      console.log("Connected to Server");
    });
  })
  .catch((err) => {
    console.log(err);
  });
