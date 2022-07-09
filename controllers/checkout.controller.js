const mp = require('../modules/mercadoPago');
module.exports = {
    // Step 8
    process: async (req,res) => {
        try {
            let items = req.session.cart.map(item => Object({...item, currency_id: 'ARS', unit_price: item.price}));
            
            let link = await mp(items, 12, 0)
                link = link.body.init_point;
            
           res.redirect(link);
           
            
        } catch (error) {
            console.log(error);
            
            return res.send(error)
        }
    },
    // Step 9
    feedback: (req, res) => {
        return res.send(req.query)
    }
}; 