const express =require("express");
const { signup, logout, loginuser } = require("../controllers/authController");

const routes =express.Router();

routes.post("/login",loginuser)
routes.post("/signup",signup)

routes.post("/logout",logout)

module.exports =routes
