import express from 'express';
import consign from 'consign';

const app = express();

//Arranging the loading of modules - MVR (Model-View-Router) pattern
//verbose: false to disable the logs created by the consign module
consign({verbose: false}).include('libs/config.js')
         .then('db.js')
         .then('auth.js') //To load the auth.js during the server boot time,
        //  .then('models')  //deactivated because all models will be loaded directly by db.js
         .then('libs/middlewares.js')
         .then('routes')
         .then('libs/boot.js')
         .into(app);

export default app;
