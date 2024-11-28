import fs from 'fs';
import path from 'path';
import { Sequelize } from "sequelize";
import { logger } from './libs/logger';

let db = null;

module.exports = (app) => {
    if(!db){
        //database settings
        const config = app.libs.config;
        const sequelize = new Sequelize(
            config.database,
            config.username,
            config.password,
            config.params,
            {
                logging: (sql) => {
                    logger.info(`[${new Date()}] - ${sql}`);
                    
                },
            }
        );
        db = {
            // first being a DB connection,
            sequelize,
            // second being the Sequlize library.
            Sequelize,
            models: {}
        };

        const dir = path.join(__dirname, 'models');
        //returns an array of strings(file names) from directory 'models'
        fs.readdirSync(dir).forEach(file => {
            //iterate to import and load all models to sequelize
            const modelDir = path.join(dir, file);
            // const model = sequelize.import(modelDir);
            const model = require(modelDir)(sequelize, Sequelize)
            //then insert it to db.models that was null {}
            db.models[model.name] = model;
        });
        //To ensure the models relationship
        Object.keys(db.models).forEach(key => {
            db.models[key].associate(db.models)
        });
    }

    return db;
}