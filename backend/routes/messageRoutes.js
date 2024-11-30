const express =require("express");
const { sendmessage, getmessage } = require("../controllers/messageControllers");
const protectRoute = require("../middleware/protectRoute");

const routes =express.Router();

routes.post("/send/:id",protectRoute,sendmessage)
routes.get("/:id",protectRoute,getmessage)

module.exports =routes
