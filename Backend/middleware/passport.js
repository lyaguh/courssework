const jwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt  
const User = require('../models/user')
const {secret} = require('../config')



const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
}

module.exports = passport => {
    passport.use(
        new jwtStrategy(options, async (payload,done) => {
            try{
                const user = await User.findById(payload.id).select('login id')

                if (user) {
                    done(null, user)
                } else {
                    done(null, false)
                }
            } catch (er) {
                console.log(payload)
                console.log(er)
            }
            
        })
    )
}