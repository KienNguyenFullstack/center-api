const express = require("express");
const router = express.Router();
const controllers = require("../controllers/authControllers");
require("dotenv").config();

// [POST] /auth/login
router.post("/login", controllers.login);
// [POST] /auth/register
router.post("/register", controllers.register);
// [GET] /auth/users
router.get("/users", controllers.users);

module.exports = router;