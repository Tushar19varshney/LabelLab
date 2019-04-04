const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
	user:{
		type: Schema.Types.ObjectId, 
		ref: "User"
	},
	project_name:{
		type:String,
		required:true
	},
	created_at: {
		type: Date,
		default: Date.now
	},
	image:[{
		type: Schema.Types.ObjectId, 
		ref: "Image"
	}]
})

module.exports = mongoose.model("Project", ProjectSchema)
