// Step 7

const mercadoPago = require('mercadopago');
const credential =  process.env.MP || "TEST-3148667476802115-070817-4b5feae80c7a746772298554835c99b9-169752048";
 let server = process.env.SERVER || "https://localhost:3030";
 const feedback = `${server}/checkout/feedback`;
 const failure = `${server}/checkout/feedback`;
 const pending = `${server}/checkout/feedback`;  

const mp  = async (items, cuotes, shipping ) => {
    try {
        // Magic
        mercadoPago.configure({
            access_token: credential
        })
        let config = {
            items: items,
            back_urls: {
                success: feedback,
                failure: failure,
                pending: pending
            },
            payment_methods: {
                // cuotas
                installments: cuotes
            },
            auto_return: "approved",
            shipments:{
                cost: shipping,
                mode: "not_specified",
            }

        }

            let preference = await mercadoPago.preferences.create(config);

            return preference;

    } catch (error) {
        throw new Error(error)
    }
}
module.exports = mp
