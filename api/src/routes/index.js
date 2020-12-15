const { Router } = require('express');
// import all routers;
const productRouter = require('./product.js');
const categoryRouter = require('./category.js');
const searchRouter = require('./search.js');
const userRouter= require('./user.js');
const orderRouter =require('./order.js');
const authRouter=require('./auth.js');

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
router.use('/auth', authRouter);
router.use('/orders', orderRouter);
router.use('/products', productRouter);
router.use('/category', categoryRouter);
router.use('/search', searchRouter);
router.use('/user', userRouter);

module.exports = router;