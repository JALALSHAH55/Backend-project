const sequelize = require("./index");
const {DataType, DataTypes} = require("sequelize");
const moment = require("moment");


module.exports = (sequelize,DataTypes)=>{
    const Customer = sequelize.define("customers",{
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
    
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
            
        },
        createdAt:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    
        updatedAt:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    
    });
    Customer.beforeCreate((customer)=>{
        customer.dataValues.createdAt = moment().unix();
        customer.dataValues.updatedAt = moment().unix();
    });
    Customer.beforeUpdate((customer)=>{
         customer.dataValues.updatedAt = moment().unix();
    });     
       return Customer;    
}

