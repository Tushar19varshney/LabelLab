const mongoose = require("mongoose")
const Schema = mongoose.Schema

var LabelSchema = new Schema({
    image:{
		type: Schema.Types.ObjectId, 
		ref: "Image"
    },
	label_name:{
		type:String,
		required:true
    },
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

module.exports = mongoose.model("Label", LabelSchema)