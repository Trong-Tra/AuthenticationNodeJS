const key = process.env.PRIVATE_KEY;
const name = process.env.USER_NAME;
const pass = process.env.USER_PASSWORD;

const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extende: true }));

const user = [{ id: 1, username: name, password: pass }];

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
    res.status(400).json({ alert: "User not found" });
  }
});

app.get("/protected", verifiedToken, (_, res) => {
  res.json({ message: "Protected resource accessed" });
});
