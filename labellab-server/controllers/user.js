const jwt = require("jsonwebtoken")
var config = require("../config/jwt_secret")
// Load input validation
const validateRegisterInput = require("../utils/register")
const validateLoginInput = require("../utils/login")

// Load User model
const User = require("../models/user")

// @desc Register user
// @access Public
exports.userRegister = function (req, res, next) {
	// Form validation
	const { errors, isValid } = validateRegisterInput(req.body)

	// Check validation
	if (!isValid) {
		return res.status(400).json(errors)
	}
	User.findOne({ email: req.body.email }).then(user => {
		if (user) {
			return res.status(400).json({ msg: "Email already exists", err_field:"email" })
		}
		const newUser = new User({
			name: req.body.name,
			username:req.body.username,
			email: req.body.email,
			password: req.body.password
		})
		newUser.save().then(user => res.json({user, msg:"You are successfully registered!"})).catch(err => console.log(err))
	})
}



// @desc Login user and return JWT token
// @access Public
exports.userLogin = function (req, res, next) {
	// Form validation
	const { errors, isValid } = validateLoginInput(req.body)

	// Check validation
	if (!isValid) {
		return res.status(400).json(errors)
	}
	const email = req.body.email
	const password = req.body.password

	// Find user by email
	User.findOne({ email }).then(user => {
		// Check if user exists
		if (!user) {
			return res.status(404).json({ msg: "Email not found",err_field:"email" })
		}

		user.comparePassword(password, function (err, isMatch) {
			if (isMatch && !err) {
				// User matched
				// Create JWT Payload
				const payload = {
					id: user.id,
					name: user.name,
					username:user.username,
					email:user.email
				}

				// Sign token
				jwt.sign(
					payload,
					config.jwt_secret,
					{
						expiresIn: 31556926 // 1 year in seconds
					},
					(err, token) => {
						res.json({
							success: true,
							token:token,
							msg: "You are successfully logged in!"
						})
					}
				)
			} else {
				return res
					.status(401)
					.json({ msg: "Password incorrect", err_field:"password" })
			}
		})
	})
}

