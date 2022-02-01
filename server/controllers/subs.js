import User from '../models/user';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);




export const prices = async (req, res) =>{
    const prices = await stripe.prices.list();
    console.log('prices', prices)
    res.json(prices.data);
};

export const basicPrice= async (req, res)=>{
    const basicPrice= await stripe.prices.list({
        lookup_keys: ['basic_price']
        
    });
    res.json(basicPrice.data)
};

export const standardPrice= async (req, res)=>{
    const standardPrice= await stripe.prices.list({
        lookup_keys: ['standard_price']
    });
    res.json(standardPrice.data);
}

export const premiumPrice= async (req, res)=>{
    const premiumPrice= await stripe.prices.list({
        lookup_keys: ['premium_price']
    });

    res.json(premiumPrice.data);
}



export const price= async(req, res)=>{
    const price= await stripe.prices.update(
    "price_1KAhBrBtEPm3kg3dTmxt0lPQ",
    {   
        lookup_key:'premium_price'}
        
);
        console.log(price);
        res.json(price.data);

    }


export const price2= async(req, res)=>{
     const price2= await stripe.prices.update(
            "price_1KAh9eBtEPm3kg3dHvRTYVdL",
            {   
                lookup_key:'standard_price'}
                
        );
                console.log(price2);
                res.json(price2.data);
        
            }

export const price3= async(req, res)=>{
    const price3= await stripe.prices.update(
                       "price_1KAh0dBtEPm3kg3dyB7g2MZh",
                       {   
                           lookup_key:'basic_price'}
                           
                   );
                           console.log(price3);
                           res.json(price3.data);
                   
                       }


 export const createSubscription = async (req, res) =>{
    //console.log(req.body);
    try{
        const user = await User.findById(req.user._id);

        const session = await stripe.checkout.sessions.create({
            mode: 'subscription', 
            payment_method_types: ["card"], 
            line_items: [
               { 
                   price: req.body.priceId, 
                   quantity: 1,
               },
            ],

            customer: user.stripe_customer_id,
            success_url: process.env.STRIPE_SUCCESS_URL,
            cancel_url: process.env.STRIPE_CANCEL_URL
        })

        console.log("checkout session", session);
        res.json(session.url);
    }
    catch(err){
        console.log(err)
    }

 }         
 
 export const subscriptionStatus = async (req, res)=>{
     try{
        const user= await User.findById(req.user._id);

        const subscriptions= await stripe.subscriptions.list({
            customer: user.stripe_customer_id,
            status: 'all',
            expand: ['data.default_payment_method'],
        });

        const updated= await User.findByIdAndUpdate(user._id, {
            subscriptions: subscriptions.data, 
           

        }, {new: true});

       
        res.json(updated);

     }
     catch(err){
         console.log(err);
     }
 };

 export const subscriptions = async (req, res)=>{
     try{
        const user= await User.findById(req.user._id);
        const subscriptions= await stripe.subscriptions.list({
            customer: user.stripe_customer_id,
            status: 'all',
            expand: ['data.default_payment_method'],
        });

        console.log(subscriptions);
        res.json(subscriptions);

     }
     catch(err){
        console.log(err);
     }
 };

 export const customerPortal = async (req, res)=>{
     try{
        const user= await User.findById(req.user._id);
        const portalSession= await stripe.billingPortal.sessions.create({
            customer: user.stripe_customer_id,
            return_url: process.env.STRIPE_SUCCESS_URL
        });
        res.json(portalSession.url);
     }
     catch(err){
         console.log(err)
     }
 }