const User = require('./models/User');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
function initialize(passport) {
    ExtractJWT.fromAuthHeaderAsBearerToken()
    passport.use( new JWTStrategy({
        
        jwtFromRequest:()=>"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTI0YzJkMTAyMTVlNzNiM2NjMDUyOWEiLCJpYXQiOjE2Mjk4MTMxODIsImV4cCI6MTYyOTgxMzE4Mn0.7zvxdNuYLs9FVYlH0nEOsrT1GMZV1_hLsA8I7sMzjcA",
        secretOrKey: process.env.JWT_SECRET_KEY
    },
    function(jwtPayload, done){
        console.log(jwtPayload)
        return User.findById(jwtPayload.sub)
        .then(user => {return done(null, user)})
        .catch(err => {return done(err)})
    }
    ))

}

module.exports = initialize;