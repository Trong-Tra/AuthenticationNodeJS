const key = process.env.PRIVATE_KEY;
const name = process.env.USER_NAME;
const pass = process.env.USER_PASSWORD;

const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extende: true }));

const user = [{ id: 1, username: name, password: pass }];
