let User = require("../models/user")
let Image = require("../models/image")
let fs = require("fs")
let Project = require("../models/project")
let Label = require("../models/label")

exports.userInfo = function (req, res) {
	User.findOne({
		email: req.user.email
	})
		.select("name email profile_image username")
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

exports.projectInfo = function (req, res) {
	Project.find({
		user:req.user._id
	})
		.select("project_name")
		.populate("image",)
		.exec(function (err, project) {
			if (err) {
				return res.status(400).send({
					success: false,
					msg: "Unable to connect to database. Please try again.",
					error: err
				})
			}
			if (!project) {
				return res.status(400).send({ success: false, msg: "project not found" })
			}else {
				return res.json({ success: true, msg: "project Data Found", body: project })
			}
		})
}

exports.imageData = function (req, res) {
	console.log(req.body.project_id)
	Project.find({
		_id: req.body.project_id
	})
		.select("project_name")
		.populate({path:"image",populate:{path:"label" }})
		.exec(function (err, project) {
			if (err) {
				return res.status(400).send({
					success: false,
					msg: "Unable to connect to database. Please try again.",
					error: err
				})
			}
			console.log(project)
			if (!project) {
				return res.status(400).send({ success: false, msg: "Project not found" })
			}else {
				return res.json({ success: true, msg: "Project Data Found", body: project })
			}
		})
}

exports.upload_image = function (req, res) {
	if (req && req.body && req.body.image && req.body.format) {
		console.log(req.body)
		let data = {
			id: req.user.id,
			email: req.user.email,
			img: req.body.image,
			format: req.body.format
		}
		let baseImg = data.img.split(",")[1]
		let binaryData = new Buffer(baseImg, "base64")
		let ext = data.format.split("/")[1]
		let updateData = { profile_image: `${data.id}.${ext}` }
		const url = `/public/img/${updateData.profile_image}`
		require("fs").writeFile(`./public/img/${updateData.profile_image}`, binaryData, function (err) {
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

exports.imageInfo = function (req, res) {
	Image.findOne({
		_id:req.body.image_id
	})
		.select("image_name image_url")
		.populate("label","label_name startX endX startY endY")
		.exec(function (err, image) {
			if (err) {
				return res.status(400).send({
					success: false,
					msg: "Unable to connect to database. Please try again.",
					error: err
				})
			}
			if (!image) {
				return res.status(400).send({ success: false, msg: "image not found" })
			}else {
				return res.json({ success: true, msg: "image Data Found", body: image })
			}
		})
}

exports.postLabel = function (req,res){
	if (req && req.body && req.body.label) {
		let data={
			label:req.body.label,
			image_id:req.body.image_id
		}
		data.label.map((label,index)=>{
			let tmp = label
			tmp["image"] = data.image_id
			label = tmp
		})
		Label.collection.insertMany(data.label, function (err, label) {
			if (err){
				return res.status(400).send({ success: false, msg: "Unable To Upload Image. Please Try Again." })
			} else {
				Image.updateMany({ _id: data.image_id }, { $addToSet: {label: label.ops} })
					.exec(function (err,image) {
						console.log(image)
						if (err) {
							return res.status(400).send({ success: false, msg: "Cannot Append image", error: err })
						}
						return res.json({ success: true, msg: "Image Successfully Posted"})
					})}
		})

	} else res.status(400).send({ success: false, msg: "Invalid Data" })
}

exports.initializeProject = function (req, res) {
	if (req && req.body && req.body.project_name) {
		Project.findOne({ project_name: req.body.project_name }).then(project => {
			if (project) {
				return res.status(400).json({ msg: "Project name already exists" })
			}
			const newProject = new Project({
				project_name: req.body.project_name,
				user:req.user.id
			})
			newProject.save(function (err, project) {
				if (err) {
					return res.status(400).send({ success: false, msg: "Unable to Add Idea" })
				} else if (project._id) {
					User.update({ _id: req.user._id }, { $addToSet: {project: project._id} })
						.exec(function (err) {
							if (err) {
								return res.status(400).send({ success: false, msg: "Cannot Append Project", error: err })
							}
							return res.json({ success: true, msg: "Project Successfully Posted", body: project })
						})
				} else {
					return res.status(400).send({ success: false, msg: "Project ID Not Found", body: project })
				}
			})
		})
	} else res.status(400).send({ success: false, msg: "Invalid Data" })
}

exports.submitImage = function (req,res){
	if (req && req.body && req.body.image && req.body.project_id && req.body.image_name && req.body.format) {

		let data = {
			id: req.user.id,
			image:req.body.image,
			image_name: req.body.image_name,
			format: req.body.format,
			project_id:req.body.project_id
		}
		let baseImg = data.image.split(",")[1]
		let binaryData = new Buffer(baseImg, "base64")
		let ext = data.format.split("/")[1]
		let updateData = { image_url: `${data.id}${Date.now()}.${ext}` }

		fs.writeFile(`./public/uploads/${updateData.image_url}`, binaryData, async (err) => {
			if (err) {
				return res.status(400).send({ success: false, msg: err })
			} else {
				const newImage = new Image({
					project:req.body.project_id,
					image_url:updateData.image_url,
					image_name:data.image_name,
				})
				newImage.save(function (err, image) {
					if (err) {
						return res.status(400).send({ success: false, msg: "Unable to Add Image" })
					} else if (image._id) {
						Project.updateOne({ _id: req.body.project_id }, { $addToSet: {image: image._id} })
							.exec(function (err,project) {
								if (err) {
									return res.status(400).send({ success: false, msg: "Cannot Append image", error: err })
								}
								return res.json({ success: true, msg: "Image Successfully Posted", body: image })
							})
					} else {
						return res.status(400).send({ success: false, msg: "Image ID Not Found", body: image })
					}
				})
			}
		})
	} else res.status(400).send({ success: false, msg: "Invalid Data" })
}