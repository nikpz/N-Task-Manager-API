module.exports = {
    database: 'ntask',
    username: '',
    password: '',
    params: {
        dialect: 'sqlite',
        storage: 'ntask.sqlite', //defines the directory where the database files will be recorded
        logging: false,
        define: {
            underscored: true  //standardize the tables fields’ name in lowercase letters with underscore;
        }
    },
    jwtSecret: 'Ntas$K-API1',   //serves as a base to encode/decode tokens.
    jwtSession: {session: false}    //inform Passport that the API won’t manage session
};
