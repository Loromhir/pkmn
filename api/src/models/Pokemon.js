const {DataTypes} = require('sequelize');

module.exports= (sequelize)=>{
    sequelize.define('Pokemon', {
        id:{
            type :DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type : DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        hp: {
            type : DataTypes.INTEGER,
        },
        attack : {
            type : DataTypes.INTEGER,
        },
        defense : {
            type: DataTypes.INTEGER
        },
        height : {
            type : DataTypes.INTEGER,
        }, 
        speed : {
            type : DataTypes.INTEGER 
        },
        weight : {
            typr: DataTypes.INTEGER
        },
        createInDB : {
            type : DataTypes.BOOLEAN,
            allowNull : false,
            defaultValue: true
        }
    })
};