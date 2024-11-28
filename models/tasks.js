module.exports = (sequelize, DataTypes) => {
    const Tasks = sequelize.define('Tasks', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        done: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });
    Tasks.associate = (models) => {
        Tasks.belongsTo(models.Users);
    }
    // {
    //     //static function for model relationship 1-N (Tasks(1) -> Users(N))
    //     classMethods: {
    //         associate: (models) => {
    //             Tasks.belongsTo(models.Users);
    //         }
    //     }
    // }

    return Tasks;

}


/** static data
return{
    //params is filtering query parameter option
    findAll: (params, callback) => {
        //static data from callback
        return callback([
            {title: "Buy some shoes"},
            {title: 'Fix Notebook'}
        ]);
    }
}
*/