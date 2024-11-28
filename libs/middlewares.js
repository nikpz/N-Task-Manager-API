/**To prepare the house for new visitors.  load all the middlewares and specific settings of Express. */
import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import compression from 'compression';
import {logger} from './logger';
import helmet from 'helmet';

module.exports = app => {
    app.set('port', 3001);
    // app.set('json spaces', 3);
    app.set('view engine', 'ejs');
    //morgan on top of the middleware, to log all requests
    app.use(morgan('common', { 
            //Output stream for writing log lines, defaults to process.stdout.
            //To send logs to module 'logger' - add stream attr as a callback write(mesage)
        stream: {
                // send variable message to log function 'logger.info(message)
                write: (message) => {
                    logger.info(message)
                }
            }
        }
    ));
    app.use(helmet());
    app.use(cors({
        origin: ["http://localhost:3000", 'https://localhost:3000', "http://localhost:3001", 'https://localhost:3001'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Content-Range'],
        credentials: true
    }));
    app.use(compression());
    app.use(bodyParser.json());
    //SOURCE OF THE ERROR WITH THE POST REQUEST
    // app.use(bodyParser.urlencoded({extended: false}))
    app.use(app.auth.initialize());  //To initiate the Passport middleware
    app.use((req, res, next) => {
        // To avoid some invalid access & ensuring the exclusion of the id attribute within the request’s body
        delete req.body.id;
        // res.setHeader("Content-Type", "application/json");
        next();
    });
    // to enable our API to server static file from the folder public to view the documentation page
    app.use(express.static('public'));
}

//To enable a JSON parse inside all API’s routes, we must install the body-parser module

// app.use(bodyParser.json()) basically tells the system that you want json to be used.
// bodyParser.urlencoded({extended: ...}) basically tells the system whether you want to use a simple algorithm for shallow parsing (i.e. false) or complex algorithm for deep parsing that can deal with nested objects (i.e. true).