require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");

const key = process.env.PRIVATE_KEY;
const name = process.env.USER_NAME;
const pass = process.env.USER_PASSWORD;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const users = [{ id: 1, username: name, password: pass }];

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    const token = jwt.sign({ id: user.id, username: user.username }, key);

    res.set(`Authorization`, `Holder ${token}`);
    res.redirect(`/IsTokenProtected=${encodeURIComponent(token)}`);
  } else {
    res.status(401).json({ alert: "User not found" });
  }
});

app.get("/IsTokenProtected", verifiedToken, (_, res) => {
  res.json({ message: "Protected resource accessed" });
});

function verifiedToken(req, res, next) {
  const authHeader = req.headers["Authorization"];
  const token = req.query.token || (authHeader && authHeader.split(" ")[1]);
  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

app.use((_, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
