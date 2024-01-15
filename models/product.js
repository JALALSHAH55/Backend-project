const sequelize = require("./index");
const {DataType, DataTypes} = require("sequelize");

const Product = sequelize.define("products",{
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    price:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    createdAt:{
        type: DataTypes.DATE,
        allowNull: false,
    },

    updatedAt:{
        type: DataTypes.DATE,
        allowNull: false,
    },

});

module.exports =  Product;