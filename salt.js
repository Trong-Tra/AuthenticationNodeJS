const crypto = require("crypto");

// Generate random salt
const salt = crypto.randomBytes(16).toString("hex");
console.log("Generated salt:", salt);
