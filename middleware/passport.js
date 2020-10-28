const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const keys = require('../config/keys')
const mongoose = require('mongoose')
const User = mongoose.model('users')

const options = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwt
}



module.exports = passport => {
    passport.use(
        new JWTStrategy(options, async (payload, done) => {
            try {
                const user = await User.findById(payload.userId).select('email id')
                console.log(user)
                if (user) {
                    //first param of done is error, second is data
                    done(null, user)
                } else {
                    done(null, false)
                }
            } catch (e) {
                console.log(e)
            }
        })
    )

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
}