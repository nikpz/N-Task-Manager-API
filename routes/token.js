// generating an encoded token with a payload, given to the user that
//  ..sends the right e-mail and password via req.body.email e req.body.password
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');
const cfg = require('../libs/config.development');


module.exports = app => {
    const Users = app.db.models.Users;
    const {secret} = cfg.jwt
    /**
     * @api {post} /token Authentication Token
     * @apiGroup Credentials
     * @apiParam {String} [email] User email
     * @apiParam {String} [password] User password
     * @apiParamExample {json} Input
     *      {
     *          "email": "nikpz.co@gmail.com",
     *          "password": "123456"
     *      }
     * @apiSuccess {String} token Token of Authenticated user
     * @apiSuccessExample {json} Success
     *  HTTP/1.1 200 OK
     *  {"token": "xyz.abc.123.hgf"}
     * @apiErrorExample {json} Authentication error
     *  HTTP/1.1 401 Unauthorized
     */
    app.post('/token', async (req, res) => {
        try{
            const {email, password} = req.body;
            if(email && password){
                const where = {email};
                const user = await Users.findOne({where});
                if(bcrypt.compareSync(password, user.password)){
                    const payload = {id: user.id};
                    const token = jwt.encode(payload, secret);
                    return res.json({token});
                }
            }
            return res.sendStatus(401);
        } catch(err){
            return res.sendStatus(401);
        }
        // if(req.body.email && req.body.password){
        //     const email = req.body.email;
        //     const password = req.body.password;
        //     Users.findOne({where: {email: email}}).then(user => {
        //                                             if(Users.isPassword(user.password, password)){
        //                                                 const payload = {id: user.id};
        //                                                 res.json({ token: jwt.encode(payload, cfg.jwtSecret)})
        //                                             } else {
        //                                                 res.sendStatus(401);  //Unauthorized error (401)
        //                                             }
        //     }).catch(err => res.sendStatus(401));
        // }else {
        //     res.sendStatus(401)
        // }
    });
};
