const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const keys = require('../config/keys')

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
		},
		function (accessToken, refreshToken, profile, cb) {
			User.findOrCreate({ googleId: profile.id }, function (err, user) {
				return cb(err, user)
			})
		}
	)
)
