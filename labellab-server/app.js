var createError = require("http-errors")
var express = require("express")
var mongoose = require("mongoose")
var cookieParser = require("cookie-parser")
var logger = require("morgan")
let config = require("./config/db_uri")
var indexRouter = require("./routes/routes")
let cors = require("cors")

var app = express()


app.use(logger("dev"))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use("/", indexRouter)

// Connect to MongoDB
mongoose
	.connect(config.mongoURI, { promiseLibrary: require("bluebird"), useNewUrlParser: true })
	.then(() => console.log("MongoDb connected successfully!"))
	.catch(err => console.error(err))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get("env") === "development" ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.render("error")
})

module.exports = app
