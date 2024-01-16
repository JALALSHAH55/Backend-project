
const {products: Products} = require('../models');
const {Op} = require("sequelize");
module.exports = {
    addProduct: async function (req, res) {
        try {
            const { productName, price } = req.body;
            console.log(productName,price);
            const product = await Products.create({
                name: productName,
                price,
            })
             res.status(201).send({
                message: "product added succesfully",
                product,
             });
        } catch (err) {
            console.log(err);
            res.status(500).send(err.message || 'something went wrong')
        }
    },
    getSingleProduct: async (req, res) => {
        try {
            let { productId } = req.params;
            productId = Number(productId);
            // const product = await Products.findOne({
            //     where: {
            //         id: productId,
            //     }
            // })
            const product = await Products.findByPk(productId);
            if (!product) {
                return res.status(404).send("product not found")
            }
            res.status(201).send(product);
        } catch (err) {
            console.log(err);
            res.status(500).send(err.message || 'something went wrong')
        }
    },
    get: async (req, res, next) => {
        try {
          const products = await Products.findAll({
            where: {
                name: 'watch',
            }
          });
            res.status(200).send(products)
        } catch (err) {
            console.log(err);
            res.status(500).send(err.message || 'something went wrong')
        }
    },
    changeProduct: async (req, res) => {
         try {
            let { productId } = req.params;
            const {name, price} = req.body; 
            if(!name || !price){
               return res.status(409).send("Required fields cannot be empty");
            }
            productId =Number(productId);
            const updateDate = new Date().toISOString().slice(0,10)
            let product = await Products.findByPk(productId);
            if (!product) {
                return res.status(404).send("product not found")
            }
            product = await product.update({
                name,
                price,
                createdAt: updateDate,
                updatedAt: updateDate,
            });
            res.status(201).send(product);
        } catch (err) {
            console.log(err);
            res.status(500).send(err.message || 'something went wrong')
        }
    },
    deleteProduct: async (req, res) => {
        try {
            let { productId } = req.params; 

            productId =Number(productId);
            await Products.destroy({
                where:{
                    id: productId,
                }
            })
            res.status(201).send('product deleted successfully');
        } catch (err) {
            console.log(err);
            res.status(500).send(err.message || 'something went wrong')
        }
    },

    showProducts: async function (req, res) {

        try {
            const dbconnection = await connection();
            const [products] = await dbconnection.execute('SELECT * FROM products');
            res.status(200).render('products', { products })
        } catch (err) {
            console.log(err);
            res.status(500).send(err.message || 'something went wrong')
        }
    }
}