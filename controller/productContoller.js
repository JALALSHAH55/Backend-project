const { name } = require('ejs');
const connection = require('../models/index');
module.exports = {
    addProduct: async function (req, res) {
        try {
            const { name, price } = req.body;
            const date = '2024-01-01';
            const dbconnection = await connection();
            await dbconnection.execute(`INSERT INTO products (name, price, createdAt, updatedAt) VALUES ("${name}",
            ${price}, "${date}", "${date}")`);
            res.status(201).send("Product added successfully")
        } catch (err) {
            console.log(err);
            res.status(500).send(err.message || 'something went wrong')
        }
    },
    getSingleProduct: async (req, res) => {
        try {
            let { productId } = req.params;
            productId = Number(productId);
            const dbconnection = await connection();
            const [product] = await dbconnection.execute(`SELECT * from products where id = ${productId}`);
            if (product.length === 0) {
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
            const dbconnection = await connection();
            const [products] = await dbconnection.execute('SELECT * FROM products');
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
            console.log(updateDate);

            const dbconnection = await connection();
            const [product] = await dbconnection.execute(`UPDATE products SET name ="${name}", price= ${price}, updatedAt = "${updateDate}"
             WHERE id = ${productId}`,
             );
            if (product.length === 0) {
                return res.status(404).send("product not found")
            }
            res.status(201).send(product);
        } catch (err) {
            console.log(err);
            res.status(500).send(err.message || 'something went wrong')
        }
    },
    deleteProduct: (req, res) => {
        let { productIndex } = req.params;
        productIndex = Number(productIndex);
        if (!products[productIndex]) {
            return res.status(404).send("Product not found")
        }
        products.splice(productIndex, 1);
        res.status(200).send("Product Deleted Successfully!")
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