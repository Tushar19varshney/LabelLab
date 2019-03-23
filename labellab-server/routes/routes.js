var express = require("express")
var router = express.Router()

// API's path
var usersRoute = require("./users/routes")

// Routes

// -> /api/auth/
router.use("/api/auth", usersRoute)

module.exports = router