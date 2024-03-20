require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const key = process.env.PRIVATE_KEY;
const name = process.env.USER_NAME;
const pass = process.env.USER_PASSWORD;
// const salt = process.env.USER_SALT;
// const iterations = 10000;
// const keylen = 32;
// const digest = "sha512";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// async function hashedPassword(password, salt) {
//   return new Promise((resolve, reject) => {
//     if (!salt || typeof salt !== "string") {
//       reject(new Error("Salt is undefined or not a string"));
//       return;
//     }

//     crypto.pbkdf2(
//       password,
//       salt,
//       iterations,
//       keylen,
//       digest,
//       (err, deriveKey) => {
//         if (err) reject(err);
//         else resolve(deriveKey.toString("hex"));
//       }
//     );
//   });
// }

async function InitializedUsers() {
  const saltRounds = 10;
  const hashedpass = await bcrypt.hash(pass, saltRounds);
  return [
    {
      id: 1,
      username: name,
      password: hashedpass,
      // salt: salt,
    },
  ];
}

app.post("/login", async (req, res) => {
  console.log("Received request body:", req.body);
  const { username, password } = req.body;
  try {
    const users = await InitializedUsers();
    // const hashedpass = await hashedPassword(password, salt);

    const user = users.find((u) => u.username === username);
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign({ id: user.id, username: user.username }, key);

        res.header(`Authorization`, `Holder ${token}`);
        res.redirect(`/IsTokenProtected?token=${encodeURIComponent(token)}`);
      } else {
        res.status(401).json({ alert: "Wrong password" });
      }
    } else {
      res.status(401).json({ alert: "User not found" });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ alert: "Internal server error" });
  }
});

app.get("/IsTokenProtected", verifiedToken, (_, res) => {
  console.log("User Authorized");
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

app.use((err, _, res) => {
  if (err) {
    res.status(500).json({ alert: "Internal server error" });
  }
  res.status(404).json({ message: "Not Found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
