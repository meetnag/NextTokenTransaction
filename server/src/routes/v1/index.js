const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const transferRoute = require('./transfer.route');
const coinRoute = require('./coin.route');
const invoiceRoute = require('./invoice.route');
const taToken = require('./taToken.route');
const wrapperToken = require('./wrapperToken.route');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/docs', docsRoute);
router.use('/transfers', transferRoute);
router.use('/coins', coinRoute);
router.use('/invoice', invoiceRoute);
router.use('/taToken', taToken);
router.use('/wrapperToken', wrapperToken);

module.exports = router;
