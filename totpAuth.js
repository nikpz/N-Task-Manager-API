import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";

module.exports = app => {
    const Users = app.db.models.Users;
    const cfg = app.libs.config;
    const params = {
        secretOrKey: cfg.jwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    };
    const strategy = new Strategy(params, (payload, done) => {
        Users.findByPk(payload.id).then(user => {
                                    if(user){
                                        //send the authenticated user's data to the authenticated routes receive these data vis req.user
                                        return done(null, {
                                            key: key,
                                            period: period       
                                        });
                                    }
                                    return done(null, false);
                                    }).catch(err => done(err, null));
    });
    passport.use(strategy);
    return{
        initialize: () => {
            return passport.initialize();
        },
        authenticate: () => {
            return passport.authenticate('totp', {failureRedirect: '/verify-otp'});
        }
    }
}