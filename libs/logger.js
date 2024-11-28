/**Logger is for two important aspect:
 *  1- To generate SQL logs commands modifying the file libs/config.development.js to load our module logger
 */
import fs from 'fs';
import winston from 'winston';

if(!fs.existsSync('logs')){
    fs.mkdirSync('logs');
}

const options ={
    file: {
        level: 'info',
        name: 'file.info',
        filename: 'logs/app.log',
        handleExceptions: true,
        timestamp: true,
        json: true,
        maxsize: 5242880,   //5MB
        maxFiles: 100,
        colorize: true
    },
    errorFile: {
        level: 'error',
        name: 'file.error',
        filename: 'logs/error.log',
        timestamp: true,
        handleExceptions: true,
        json: true,
        maxsize: 5242880,   //5MB
        maxFiles: 100,
        colorize: true,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        timestamp: true,
        json: true,
        colorize: true
    },
};


//Your centralized logger object
export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    // Responsible for creating and maintaining several recent logs files
    // A transport is essentially a storage device for your logs.
    // Each instance of a winston logger can have multiple transports configured at different levels
    transports: [
        new (winston.transports.Console)(options.console),
        new (winston.transports.File)(options.file),
        new (winston.transports.File)(options.errorFile)
    ],
    exitOnError: false, //do not exit on handled exceptions
});

// export class LoggerStream {
//     write(message, encoding){
//         // logger.info(message.substring(0, message.lastIndexOf('\n')));
//         logger.info(`[${new Date()}] - ${sql}`);
//     }
// }

// const logger = winston.createLogger(logConfig);
// exports.logger = logger;
// export default logger;