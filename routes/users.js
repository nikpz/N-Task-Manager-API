module.exports = app => {
    const Users = app.db.models.Users;
    app.route('/user').all(app.auth.authenticate())
                      /**
                       * @api {get} /user Return the authenticated user's data
                       * @apiGroup User
                       * @apiHeader {String} Authorization Token of authenticated user
                       * @apiHeaderExample {json} Header
                       *    {"Authorization": "JWT xyz.abc.123.hgf"}
                       * @apiSuccess {Number} id User id
                       * @apiSuccess {String} name User name
                       * @apiSuccess {String} email User email
                       * @apiSuccessExample {json} Success
                       *    HTTP/1.1 200 OK
                       *    {
                       *        "id": 1,
                       *        "name": "nikpz co",
                       *        "email": "nikpz.co@gmail.com"
                       *    }
                       * @apiErrorExample {json} Find error
                       *    HTTP/1.1 412 Precondition Failed
                       */
                      .get(async (req, res) => {
                            try{
                                const {id} = req.user;
                                const attributes = ['id', 'name', 'email'];
                                const options = {attributes};
                                //Users.findById(req.params.id, {})    findById deprecated to findByPk
                                const result = await Users.findByPk(id, options);
                                if(result){
                                    res.json(result);
                                } else {
                                    res.sendStatus(404);
                                }
                            } catch(err){
                                res.status(412).json({msg: err.message});
                            }
                            // Users.findByPk(req.user.id, {
                            //     attributes: ['id', 'name', 'email']
                            // }).then(result => res.json(result))
                            // .catch(err =>  {
                            //     res.status(412).json({msg: err.message})
                            // })
                        })
                        /**
                         * @api {delete} /user Deletes an authenticated user
                         * @apiGroup User
                         * @apiHeader {String} Authorization Token of authenticated user
                         * @apiHeaderExample {json} Header
                         *      {"Authorization": "JWT xyz.abc.123.hgf"}
                         * @apiSuccessExample {json} Success
                         *      HTTP/1.1 204 No Content
                         * @apiErrorExample {json} Delete error
                         *      HTTP/1.1 412 Precondition Failed
                         */
                        .delete(async (req, res) => {
                            try{
                                const {id} = req.user;
                                const where = {id};
                                await Users.destroy({id});
                                res.sendStatus(204);
                            } catch(err){
                                res.status(412).json({msg: err.message});
                            }
                            // Users.destroy({where: {id: req.params.id} })
                            //     .then(result => res.sendStatus(204))
                            //     .catch(err => {
                            //         res.status(412).json({msg: err.message});
                            //     });
                        });
    /**
     * @api {post} /users Register a new user
     * @apiGroup User
     * @apiParam {String} [name] User name
     * @apiParam {String} [email] User email
     * @apiParam {String} [password] User password
     * @apiParamExample {json} Input
     * {
     * "name": "John Connor",
     * "email": "john@connor.net",
     * "password": "123456"
     * }
     * @apiSuccess {Number} id User id
     * @apiSuccess {String} name User name
     * @apiSuccess {String} email User email
     * @apiSuccess {String} password User encrypted password
     * @apiSuccess {Date} updated_at Update's date
     * @apiSuccess {Date} created_at Register's date
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "id": 1,
     * "name": "John Connor",
     * "email": "john@connor.net",
     * "password": "$2a$10$SK1B1",
     * "updated_at": "2016-02-10T15:20:11.700Z",
     * "created_at": "2016-02-10T15:29:11.700Z",
     * }
     * @apiErrorExample {json} Register error
     * HTTP/1.1 412 Precondition Failed
    */
    app.post('/users', async (req, res) => {
        try{
            const result = await Users.create(req.body);
            res.json(result);
        } catch(err){
            res.status(412).json({msg: err.message});
        }
        // Users.create(req.body)
        //      .then(result => res.json(result))
        //      .catch(err => {
        //         res.status(412).json({msg: err.message});
        //      });
    });
};

// The reason why we’re not using the function app.route() here is because in the next
// chapter, we are going to modify some specific points on each user’s route, to find or delete only if
// the user is logged in the API