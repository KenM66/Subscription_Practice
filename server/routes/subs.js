import express from 'express'

const router = express.Router();

import { prices, createSubscription, subscriptionStatus, subscriptions } from "../controllers/subs"
import {requireSignin} from "../middlewares"

import {price, price2, price3, basicPrice, standardPrice, premiumPrice, customerPortal } from "../controllers/subs"

router.get('/prices', prices);

router.get('/basicPrice', basicPrice);

router.get('/standardPrice', standardPrice);

router.get('/premiumPrice', premiumPrice);


router.post('/price', price);

router.post('/price2', price2);

router.post('/price3', price3);

router.post('/create-subscription', requireSignin, createSubscription);

router.get('/subscription-status', requireSignin, subscriptionStatus);

router.get('/subscriptions', requireSignin, subscriptions);

router.get('/customer-portal', requireSignin, customerPortal)

module.exports= router;