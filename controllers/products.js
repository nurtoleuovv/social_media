const db = require('../models');

const createProduct = async (req, res) => {
    try {
        let {
            title, 
            description, 
            price
        } = { ... req.body, ...req.query};

        if (!title){return res.status(400).json({message: '"title" is required!'});}
        if(typeof title !== "string"){return res.status(400).json({message: 'Invalid type for "title"'})}
        
        if (!description){return res.status(400).json({message: '"description" is required!'});}
        if(typeof title !== "string"){return res.status(400).json({message: 'Invalid type for "title"'})}
        
        if (!price){return res.status(400).json({message: '"price" is required!'});}
        
        price = parseFloat(price);
        if(!price){return res.status(400).json({message: 'Invalid "price"'})}

        await db.Products.create({
            title,
            description,
            price,
            date: new Date()
        });
        return res.status(200).json({message: "Product is created"});


    } catch (error) {
        console.dir(error);
        return res.status(500).json(error);
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await db.Products.findAll();
        if (!products){
            return res.status(500).json({message: "table Products is not exist"});
        }

        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getProductById = async (req, res) => {
    try {
        let {id} = req.params;
        id = parseInt(id);
        
        if (!id) {
            return res.status(400).json({message: "invalid value for 'id'"});
        }

        const product = await db.Products.findOne({
            where: {
                id
            },
            raw: true
        });

        if (!product) {
            return res.status(400).json({message: "product is not found"});
        }

        return res.status(200).json(product);

    } catch (error) {
        console.dir(error);
        return res.status(500).json(error);
    }
}

module.exports = {
    createProduct, 
    getAllProducts,
    getProductById
}