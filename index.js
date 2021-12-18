const cookieSession = require('cookie-session')
const express = require('express')
const { cookie } = require('express/lib/response')
const mongoose = require('mongoose')
const passport = require('passport')
const keys = require('./config/keys')
const cors = require('cors')

require('./models/User')
require('./services/passport')

mongoose.connect(keys.mongoURI)

const app = express()

app.use(cors())
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey],
	})
)

app.use(passport.initialize())
app.use(passport.session())

require('./routes/authRoute')(app)

const PORT = process.env.PORT || 5000
app.listen(PORT)
