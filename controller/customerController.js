const {customers: Customers} = require('../models');
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
             customer = await Customers.create({
                name,
                email,
                password,
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
