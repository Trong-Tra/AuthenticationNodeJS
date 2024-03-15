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
  console.log("Received request body:", req.body);
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    const token = jwt.sign({ id: user.id, username: user.username }, key);

    res.header(`Authorization`, `Holder ${token}`);
    res.redirect(`/IsTokenProtected?token=${encodeURIComponent(token)}`);
  } else {
    res.status(401).json({ alert: "User not found" });
  }
});

app.get("/IsTokenProtected", verifiedToken, (_, res) => {
  console.log("User detected!");
  res.json({
    message: "Protected resource accessed",
  });
});

function verifiedToken(req, res, next) {
  const authHeader = req.headers["Authorization"];
  const token = req.query.token || (authHeader && authHeader.split(" ")[1]);
  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, key, (err, user) => {
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
