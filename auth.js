import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
const config = require('./libs/config.development');

module.exports = app => {
    const Users = app.db.models.Users;
    const { jwt } = config;
    const params = {
        secretOrKey: jwt.secret,
        //This callback, from now on referred to as an extractor, accepts a request object as an argument and returns the encoded JWT string or null.
        //creates a new extractor that looks for the JWT in the authorization header with the scheme 'bearer'
        jwtFromRequest: ExtractJwt.fromHeader('authorization')
    };
    passport.use( new Strategy(params, async (payload, done) => {
        try{
            const { id } = payload;
            const attributes = ['id', 'email'];
            const options = {attributes};
            const user = await Users.findByPk(id, options);
            done(null, user);
        } catch(err){
            done(err, null);
        }
    })
);
    return{
        initialize: () => passport.initialize(),
        authenticate: () => passport.authenticate('jwt', jwt.options)
            // retun passport.authenticate('totp', {failureRedirect: '/verify-otp'});
        };
    };