require('dotenv').config()

const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')
const { engine } = require('express-handlebars')

const adminRoute = require('./routes/admin.route')
const shopRoute = require('./routes/shop.route')

const app = express()

// view engine setup
app.engine(
	'handlebars',
	engine({
		extname: '.handlebars',
		partialsDir: path.join(__dirname, 'views/partials'),
	}),
)
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'))

// middlewares
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(
	session({
		secret: process.env.SECRET_KEY,
		resave: false,
		saveUninitialized: true,
		cookie: { maxAge: 900000 },
	}),
)

// Routes
app.use(shopRoute)
app.use('/admin', adminRoute)

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	// render the error page
	res.status(err.status || 500).render('error')
})

module.exports = app
