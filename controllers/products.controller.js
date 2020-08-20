const Product = require('../models/product.model');

exports.getAllProducts = async (req, res) => {
    try {
        res.json(await Product.find())
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
};


exports.getRandomProduct = async (req, res) => {
    try {
        const count = await Product.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const dep = await Product.findOne().skip(rand);

        if (dep) {
            res.json(dep)
        } else {
            res.status(404).json({
                message: 'Not found'
            })
        }
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
};

exports.geProductByID = async (req, res) => {
    try {
        const dep = await Product.findById(req.params.id);
        if (dep) {
            res.json(dep)
        } else {
            res.status(404).json({
                message: 'Not found'
            })
        }
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
}

exports.postNewProduct = async (req, res) => {
    const {
        name,
        client
    } = req.body;

    try {
        const newProduct = new Product({
            name: name,
            client: client
        });
        await newProduct.save();
        res.json(await Product.find())
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
}

exports.updateProduct = async (req, res) => {
    const {
        name,
        client
    } = req.body;
    try {
        const product = Product.findById(req.params.id);
        if (product) {
            await Product.updateOne({
                _id: req.params.id
            }, {
                $set: {
                    name: name,
                    client: client
                }
            });
            res.json(await Product.find())
        } else {
            res.json({
                message: 'Not found'
            })
        }
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const product = Product.findById(req.params.id);
        if (product) {
            await Product.deleteOne({
                _id: req.params.id
            });
            res.json(await Product.find())
        } else {
            res.json({
                message: 'Not found'
            })
        }
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
}