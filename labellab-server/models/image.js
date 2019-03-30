const mongoose = require("mongoose")
const Schema = mongoose.Schema
const User = require("./user")


var CoordinateSchema = new Schema({
	startX:{
		type:String,
		reruired:true
	},
	endX:{
		type:String,
		reruired:true
	},
	startY:{
		type:String,
		reruired:true
	},
	endY:{
		type:String,
		reruired:true
	}
})

// Create Schema
var LabelSchema = new Schema({
	label_name:{
		type:String,
		required:true
	},
	coordinates:[CoordinateSchema]
})


const ImageSchema = new Schema({
	user:{
		type: Schema.Types.ObjectId, 
		ref: "User"
	},
	image:{
		type:String,
		required:true
	},
	date: {
		type: Date,
		default: Date.now
	},
	labels:[LabelSchema]
})

module.exports = mongoose.model("Image", ImageSchema)
