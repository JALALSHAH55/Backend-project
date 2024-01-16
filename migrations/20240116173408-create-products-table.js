'use strict';

const {DataTypes} = require('sequelize');

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable('products', {
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
          type: DataTypes.STRING,
          allowNull: false,
      },
  
      updatedAt:{
          type: DataTypes.STRING,
          allowNull: false,
      },
  
  });
     
  },

   down (queryInterface, Sequelize) {
     return queryInterface.dropTable('products');
     
  }
};
