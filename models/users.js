// const { DataTypes, Sequelize } = require("sequelize");
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true 
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            },
            // set(value){
            //     const salt = bcrypt.genSaltSync();
            //     const password = bcrypt.hashSync(value, salt);
            //     this.setDataValue('password', password)
            // }
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        hooks: {
            //To encrypt user's password before save it to db
            beforeCreate: user => {
                const salt = bcrypt.genSaltSync(); // The cost of processing the data. Default 10
                user.password = bcrypt.hashSync(user.password, salt);
            }
        }
    });

    // Compare password matches with user's encrypted one
    Users.isPassword = (encodedPassword, password) => {
        return bcrypt.compareSync(password, encodedPassword);
    }
    
    Users.associate = (models) => {
        Users.hasMany(models.Tasks);
    }

    // {
    //     classMethods: {
    //         associate: (models) => {
    //             Users.hasMany(models.Tasks);
    //         }
    //     }
    // });
    return Users;
}