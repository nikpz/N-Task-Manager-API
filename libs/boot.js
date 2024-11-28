import https from 'https';
import fs from 'fs';

const certs = {
    key: fs.readFileSync('ntask.key', 'utf8'),
    cert: fs.readFileSync('ntask.crt', 'utf8')
}
/**Responsible for the server initialization */
module.exports = app => {
    async function start(port){
        try{
            // sequelize.sync creates new tables according to the schema specified in the model.
            //With ‘force’ option, however, it will alter the tables (Sequelize adds “DROP TABLE” queries)
            // force option is when you don’t need to maintain data in the table.
            if(process.env.NODE_ENV !== 'test'){
                
                app.db.sequelize.sync(/**{force: true}*/).then(() => {
                    https.createServer(certs, app).listen(port, () => {
                        console.log(`NTask API started on Port: ${port}`)
                    });
                });
            }
        } catch(err){
            console.log('Error has been occured!!');
            console.error(err);
        }
    }

    start(app.get('port'));

}
// $ npx sequelize db:migrate
// if you use ‘sync()’, then you will have the error below:
//  ..ERROR: Table 'table_users' already exist.

//$ npx sequelize-cli model:generate --name User --attributes firstName:string, lastName:string, email:string ...


//Don’t fortget to remove ‘sync()’ option from now on and use migration script instead.
// $ npx sequelize db:migrate
