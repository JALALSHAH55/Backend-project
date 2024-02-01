const {customers: Customers} = require('../models');
const bcrypt = require('bcryptjs');
const {Op} = require("sequelize");
module.exports = {
    signUp: async function (req, res) {
        try {
            const { name, email, password } = req.body;
            if(!name || !email || !password){
                return res.status(409).send('Required field cammot be empty');
            }

            let customer = await Customers.findOne({
                where:{
                    email,
                }
            })
            if(customer){
                return res.status(400).send('Customer already exists with this email');
            }
            const hashPassword = await bcrypt.hash(password, 12);
             customer = await Customers.create({
                name,
                email,
                password: hashPassword,
            })
             res.status(201).send({
                message: "customer added succesfully",
                customer,
             });
        } catch (err) {
            console.log(err);
            res.status(500).send(err.message || 'something went wrong')
        }
    },

    login: async function (req, res) {
        try {
            const { email, password } = req.body;
            if( !email || !password){
                return res.status(409).send('Required field cammot be empty');
            }

            let customer = await Customers.findOne({
                where:{
                    email,
                }
            })
            if(!customer){
                return res.status(404).send('Customer not found');
            }
            const comparePassword = await bcrypt.compare(password, customer.password);
            if(!comparePassword){
                return res.status().send
            }
             customer = await Customers.create({
                name,
                email,
                password: hashPassword,
            })
             res.status(201).send({
                message: "customer added succesfully",
                customer,
             });
        } catch (err) {
            console.log(err);
            res.status(500).send(err.message || 'something went wrong')
        }
    }
};
