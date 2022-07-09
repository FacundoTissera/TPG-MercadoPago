const {index,one} = require('../models/product.model');

module.exports ={


    index: (req,res) => res.render('home',{
        products:index(),
        styles:['home']
    }),

    // Step 3
    // agregar producto al carrito creado
    addCart: (req,res) => {

        // Find Product in DB
        // elid viene de la vista
        let product = one(req.body.id);
        // Check product exist in cart
        if (req.session.cart.find(item => item.id === product.id)) {
            // if exist, update quantity
            // Case 1: Exist and update quantity
                req.session.cart = req.session.cart.map(item => {
                    if (item.id === product.id) {
                        item.quantity++;
                    }
                    return item;
                });

        }else{
            // if not exist, add product to cart
            // Case 2: Add cart and set quantity
            req.session.cart.push({...product, quantity: 1});
        }
        return res.redirect("/")
    },



    // Step 5
    updateCart: (req,res) => {
        // Check quantity
        if (req.body.quantity <= 0) {
            // if quantity is 0, remove product from cart
            req.session.cart = req.session.cart.filter(item => item.id != req.body.id);
        }else{
            // if quantity is not 0, update quantity
            req.session.cart = req.session.cart.map(item => {
                if (item.id == req.body.id) {
                    item.quantity = req.body.quantity;
                }
                return item;
            });
        }
        // Case 1: Is equal to zero then remove product
        // Case 2: Update all cart items setting quantity in product selected
        return res.redirect("/")
    }, 
    // Step 6
    removeCart: (req,res) =>{

        // Remove product from cart
        req.session.cart = req.session.cart.filter(item => item.id != req.body.id);
        return res.redirect("/")

        
    }
}