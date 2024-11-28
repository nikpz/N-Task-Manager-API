module.exports = {
    database: 'ntask',
    username: '',
    password: '',
    params: {
        dialect: 'sqlite',
        storage: 'ntask.sqlite', //defines the directory where the database files will be recorded
        //for see what Sequelize is doing on terminal
        // logging: true,
        //To generate SQL logs commands 
    
        // dialect: config.dialect,
        // define: config.define,
        // dialectOptions: config.dialectOption,
        /** to manage connections to the database - a collection of unused database connections that are already open -
            *  The pool allows queries to be quickly associated with an available connection.
            *  If you're connecting to the database from multiple processes, you'll have to create one instance per process,
            * max=90 -> 3 processes -> Sequelize instance of each process should have a max connection pool size of 30.
            * reserving 10 connections for other uses, such as database migrations, monitoring,
            * pool is  collection of these saved, reusable connections to avoid  overhead of establishing that DB connection over and over again
            * pool: {
                max: 5, //Never have more than five open connections (max: 5)
                min: 0, //have zero open connections
                evict: 3,   //The time interval, in milliseconds, after which sequelize-pool will remove idle connections.
                maxUses: 3,  //The number of times to use a connection before closing and replacing it. Default is Infinity
                validate?: ((connection?) => boolean),  //A function that validates a connection.
                acquire: 30000, //The maximum time, in milliseconds, that pool will try to get connection before throwing error
                idle: 10000     //Remove a connection from the pool after the connection has been idle (not been used) for 10 seconds
                }
             *  */
        // pool: config.pool,
        define: {
            underscored: true  //standardize the tables fields’ name in lowercase letters with underscore;
        }
    },
    jwt:{
        secret: 'Ntas$K-API1',   //serves as a base to encode/decode tokens.
        options: {session: true}    //inform Passport that the API won’t manage session
    }
};
