 const {Sequelize} =require('sequelize');
 const sequelize = new Sequelize('fbbc', 'root', 'shahjalal555', {
  host: 'localhost',
  dialect: 'mysql'
 });

 sequelize.authenticate().then(()=>{
        console.log('connected successfully');
 }).catch((err)=>{
       console.log('err');
 })



 module.exports = sequelize;