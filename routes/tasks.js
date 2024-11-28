module.exports = app => {
    const Tasks = app.db.models.Tasks;
    app.route('/tasks')
                    // .all((req, res, next) => {
                    //     // Middleware for pre-execution of routes
                    //     // To avoid some invalid access & ensuring the exclusion of the id attribute within the request’s body
                    //     delete req.body.id;
                    //     // to warn the Express router that now it can execute the next function on the route 
                    //     next();
                    // })
                    .all(app.auth.authenticate())
                    /**
                         * @api {get} /tasks List the user's tasks
                         * @apiGroup Tasks
                         * @apiName GetList
                         * @apiHeader {String} Authorization Token of authenticated user
                         * @apiHeaderExample {json} Header
                         * {"Authorization": "JWT xyz.abc.123.hgf"}
                         * @apiSuccess {Object[]} tasks Task's list
                         * @apiSuccess {Number} tasks.id Task id
                         * @apiSuccess {String} tasks.title Task title
                         * @apiSuccess {Boolean} tasks.done Task is done?
                         * @apiSuccess {Date} tasks.updated_at Update's date
                         * @apiSuccess {Date} tasks.created_at Register's date
                         * @apiSuccess {Number} tasks.user_id Id do usuário
                         * @apiSuccessExample {json} Success
                         * HTTP/1.1 200 OK
                         * [{
                         * "id": 1,
                         * "title": "Study",
                         * "done": false
                         * "updated_at": "2016-02-10T15:46:51.778Z",
                         * "created_at": "2016-02-10T15:46:51.778Z",
                         * "user_id": 1
                         * }]
                         * @apiErrorExample {json} List error
                         * HTTP/1.1 412 Precondition Failed
                         */
                    .get(async (req, res) => {
                        try{
                            //search result occurs here 👇🏻
                            const where = {userId: req.user.id};
                            // '/tasks': List tasks
                            const result = await Tasks.findAll({where});
                            res.json(result);
                        } catch (err) {
                            res.status(412).json({msg: err.message});
                        }
                        // Tasks.findAll({where: {user_id: req.user.id}}).then(result => res.json(result))
                        //                 .catch(err => {
                        //                     //Precondition Failed status code.
                        //                     res.status(412).json({msg: err.message})
                        //                 })
                    })
                    /**
                         * @api {post} /tasks Register a new task
                         * @apiGroup Tasks
                         * @apiName PostRegister
                         * @apiHeader {String} Authorization Token of authenticated user
                         * @apiHeaderExample {json} Header
                         * {"Authorization": "JWT xyz.abc.123.hgf"}
                         * @apiParam {String} [title] <code>title</code> of the Task
                         * @apiParamExample {json} Input
                         * {"title": "Study"}
                         * @apiSuccess {Number} id Task id
                         * @apiSuccess {String} title Task title
                         * @apiSuccess {Boolean} done=false Task is done?
                         * @apiSuccess {Date} updated_at Update's date
                         * @apiSuccess {Date} created_at Register's date
                         * @apiSuccess {Number} user_id User id
                         * @apiSuccessExample {json} Success
                         * HTTP/1.1 200 OK
                         * {
                         * "id": 1,
                         * "title": "Study",
                         * "done": false,
                         * "updated_at": "2016-02-10T15:46:51.778Z",
                         * "created_at": "2016-02-10T15:46:51.778Z",
                         * "user_id": 1
                         * }
                         * @apiErrorExample {json} Register error
                         * HTTP/1.1 412 Precondition Failed
                    */
                    .post(async (req, res) => {
                        try{
                            req.body.userId = req.user.id;
                            // '/tasks': Save new task
                            const result = await Tasks.create(req.body);
                            res.json(result);
                        } catch(err){
                            res.status(412).json({msg: err.message});
                        }
                        // req.body.user_id = req.user.id;
                        // // '/tasks': Save new task
                        //                         //promises callbacks then and catch
                        // Tasks.create(req.body).then(result => res.json(result))
                        //                       .catch(err => {
                        //                         res.status(412).json({msg: err.message})
                        //                       });
                    });
    app.route('/task/:id')
                        // .all((req, res, next) => {
                        //     //Middlware for pre-execution of routes
                        //     //To avoid some invalid access & ensuring the exclusion of the id attribute within the request’s body
                        //     delete req.body.id;
                        //     // to warn the Express router that now it can execute the next function on the route 
                        //     next();
                        // })
                        .all(app.auth.authenticate())
                        /**
                             * @api {get} /tasks/:id Get a task
                             * @apiGroup Tasks
                             * @apiName GetTask
                             * @apiHeader {String} Authorization Token of authenticated user
                             * @apiHeaderExample {json} Header
                             * {"Authorization": "JWT xyz.abc.123.hgf"}
                             * @apiParam {Number} id <code>id</code> of the Task
                             * @apiSuccess {Number} id Task id
                             * @apiSuccess {String} title Task title
                             * @apiSuccess {Boolean} done Task is done?
                             * @apiSuccess {Date} updated_at Update's date
                             * @apiSuccess {Date} created_at Register's date
                             * @apiSuccess {Number} user_id User id
                             * @apiSuccessExample {json} Success
                             * HTTP/1.1 200 OK
                             * {
                             * "id": 1,
                             * "title": "Study",
                             * "done": false
                             * "updated_at": "2016-02-10T15:46:51.778Z",
                             * "created_at": "2016-02-10T15:46:51.778Z",
                             * "user_id": 1
                             * }
                             * @apiErrorExample {json} Task not found error
                             * HTTP/1.1 404 Not Found
                             * @apiErrorExample {json} Find error
                             * HTTP/1.1 412 Precondition Failed
                        */
                        .get(async (req, res) => {
                            try{
                                const {id} = req.params;
                                const where = {id, userId: req.user.id};
                                // '/tasks/1': Find a task
                                //single search of tasks based on the task :id
                                const result = await Tasks.findOne({where})
                                if(result){
                                    res.json(result)
                                } else {
                                    res.sendStatus(404);
                                }
                            } catch(err){
                                res.status(412).json({msg: err.message});
                            }
                            // Tasks.findOne({where: {id: req.params.id, user_id: req.user.id}}).then(result => { 
                            //                                     if(result){
                            //                                         res.json(result);
                            //                                     } else {
                            //                                         res.sendStatus(404)
                            //                                     }
                            //                                 }).catch(err => {
                            //                                     res.status(412).json({msg: err.message})
                            //                                 });
                        })
                        /**
                             * @api {put} /tasks/:id Update a task
                             * @apiGroup Tasks
                             * @apiName PutTask
                             * @apiHeader {String} Authorization Token of authenticated user
                             * @apiHeaderExample {json} Header
                             * {"Authorization": "JWT xyz.abc.123.hgf"}
                             * @apiParam {Number} id <code>id</code> of the task
                             * @apiParam {String} [title] <code>title</code> of the Task
                             * @apiParam {Boolean} [done] <code>done?</code> of the Task
                             * @apiParamExample {json} Input
                             * {
                             * "title": "Work",
                             * "done": true
                             * }
                             * @apiSuccessExample {json} Success
                             * HTTP/1.1 204 No Content
                             * @apiErrorExample {json} Update error
                             * HTTP/1.1 412 Precondition Failed
                        */
                        // '/tasks/1': Update task
                        .put(async (req, res) => {
                            try{
                                const {id} = req.params;
                                const where = {id, userId:req.user.id};
                                req.body.userId = req.user.id;
                                //Tasks.update cleans the fields that are not on its own model..
                                //  ...so there is no problem to send req.body directly as parameter
                                await Tasks.update(req.body, {where})
                                res.sendStatus(204);
                            } catch(err){
                                res.status(412).json({msg: err.message});
                            }
                            // Tasks.update(req.body, {where: {id: req.params.id, user_id: req.user.id}}).then(result => {
                            //                                                 res.sendStatus(204)
                            //                                          }).catch(err => {
                            //                                             res.status(412).json({msg: err.message});
                            //                                          });      
                        })
                        /**
                             * @api {delete} /tasks/:id Remove a task
                             * @apiGroup Tasks
                             * @apiName DeleteTask
                             * @apiHeader {String} Authorization Token of authenticated user
                             * @apiHeaderExample {json} Header
                             * {"Authorization": "JWT xyz.abc.123.hgf"}
                             * @apiParam {Number} id <code>id</code> of the Task
                             * @apiSuccessExample {json} Success
                             * HTTP/1.1 204 No Content
                             * @apiErrorExample {json} Delete error
                             * HTTP/1.1 412 Precondition Failed
                        */
                        // '/tasks/1': Delete a task
                        .delete(async (req, res) => {
                            try{
                                const {id} = req.params;
                                const where = {id, userId: req.user.id};
                                await Tasks.destroy({where});
                                res.sendStatus(204);
                            } catch(err){
                                res.status(412).json({msg: err.message});
                            }
                            // Tasks.destroy({where: {id: req.params.id, user_id: req.user.id}}).then(result => res.sendStatus(204))
                            //                                      .catch(err => {
                            //                                          res.status(412).json({msg: err.message})
                            //                                      });
                        });
    
};


// old exam
// app.get('/tasks', (req, res) => {
//     Tasks.findAll({/**params*/}).then(tasks => {
//         res.json({tasks: tasks});
//     });
// });
