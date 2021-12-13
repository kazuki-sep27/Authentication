const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const mongoose = require('mongoose')
const keys = require('../config/keys')

const User = mongoose.model('users')

passport.serializeUser((user, cb) => {
	cb(null, user)
})

passport.deserializeUser((id, cb) => {
	User.findById(id).then((user) => {
		cb(null, user)
	})
})

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
		},
		function (accessToken, refreshToken, profile, cb) {
			User.findOne({ googleID: profile.id }).then((existingUser) => {
				if (existingUser) {
					cb(null, existingUser)
				} else {
					new User({ googleID: profile.id }).save().then((user) => {
						cb(null, existingUser)
					})
				}
			})
		}
	)
)
