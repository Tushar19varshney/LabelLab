let User = require("../models/user")
let Image = require("../models/image")
let fs = require("fs")
let mkdirp = require("mkdirp")

exports.userInfo = function (req, res) {
	console.log("dajsbdjka")
	User.findOne({
		email: req.user.email
	})
		.select("name email image username")
		.exec(function (err, user) {
			if (err) {
				return res.status(400).send({
					success: false,
					msg: "Unable to connect to database. Please try again.",
					error: err
				})
			}
			if (!user) {
				return res.status(400).send({ success: false, msg: "User not found" })
			}else {
				return res.json({ success: true, msg: "User Data Found", body: user })
			}
		})
}

exports.labelData = function (req, res) {
	Image.find({
		user:req.user.id
	})
		.select("image labels date")
		.exec(function (err, user) {
			if (err) {
				return res.status(400).send({
					success: false,
					msg: "Unable to connect to database. Please try again.",
					error: err
				})
			}
			if (!user) {
				return res.status(400).send({ success: false, msg: "User not found" })
			}else {
				return res.json({ success: true, msg: "User Data Found", body: user })
			}
		})
}

exports.upload_image = function (req, res) {
	if (req && req.body && req.body.image && req.body.format) {
		let data = {
			id: req.user.id,
			email: req.user.email,
			img: req.body.image,
			format: req.body.format
		}
		let baseImg = data.img.split(",")[1]
		let binaryData = new Buffer(baseImg, "base64")
		let ext = data.format.split("/")[1]
		let updateData = { image: `${data.id}.${ext}` }
		const url = `/public/img/${updateData.image}`
		require("fs").writeFile(`./public/img/${updateData.image}`, binaryData, function (err) {
			if (err) {
				return res.status(400).send({ success: false, msg: "something went wrong" })
			} else {
				User.findOneAndUpdate({
					email: data.email
				}, updateData)
					.exec(function (err) {
						if (err) return res.status(400).send({ success: false, msg: "Unable To Upload Image. Please Try Again." })
						res.json({ success: true, body: url, msg: "Image Uploaded Successfully." })
					})
			}
		})
	} else res.status(400).send({ success: false, msg: "Invalid Data" })
}

exports.postLabel = function (req,res){
	if (req && req.body && req.body.image && req.body.format && req.body.label) {
		let data = {
			id: req.user.id,
			email: req.user.email,
			img: req.body.image,
			format: req.body.format,
			labels:req.body.label
		}
		let baseImg = data.img.split(",")[1]
		let binaryData = new Buffer(baseImg, "base64")
		let ext = data.format.split("/")[1]
		let updateData = { image: `${data.id}${Date.now()}.${ext}` }
		// let dir = `/public/img/${req.user.id}`
		// if (!fs.existsSync(dir)){
		// 	// mkdirp(dir,function (err){
		// 	// 	if(err) console.log(err)
		// 	// 	else console.log("Folder created successfully!")
		// 	// })
		// 	fs.mkdir("/tushar",0o776,function (err){
		// 		if (err) console.log(err)
		// 	})
		// }
		fs.writeFile(`./public/uploads/${updateData.image}`, binaryData, async (err) => {
			if (err) {
				return res.status(400).send({ success: false, msg: err })
			} else {
				const user = await User.findById(req.user.id)
				console.log(user)
				const newImage = new Image({
					user:user,
					image:updateData.image,
					labels:data.labels
				})
				newImage.save().then(image => res.json({image, msg:"You are successfully submitted"})).catch(err => console.log(err))
			}
		})
	} else res.status(400).send({ success: false, msg: "Invalid Data" })
}