var express = require("express")
var passport = require("passport")
const router = express.Router()

const userController = require("../../controllers/user") 
const requireAuth = passport.authenticate("jwt", { session: false })
const requireLogin = passport.authenticate("local", { session: false })
const actControllers = require("../../controllers/user_controls")


router.post(
	"/register", 
	userController.userRegister)

router.post(
	"/login", 
	requireLogin,
	userController.userLogin)

router.post(
	"/upload_image",
	requireAuth,
	actControllers.upload_image)

router.get(
	"/info",
	requireAuth,
	actControllers.userInfo)

router.get(
	"/projectinfo",
	requireAuth,
	actControllers.projectInfo)

router.post(
	"/imageinfo",
	requireAuth,
	actControllers.imageInfo)

router.post(
	"/postlabel",
	requireAuth,
	actControllers.postLabel)

router.post(
	"/submitimage",
	requireAuth,
	actControllers.submitImage)

router.post(
	"/setimagedata",
	requireAuth,
	actControllers.imageData)

router.post(
	"/initproject",
	requireAuth,
	actControllers.initializeProject) 

module.exports = router