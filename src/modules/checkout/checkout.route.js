
const CheckoutController = require( './checkout.controller' );
const express = require( 'express' ),
    router = express.Router();
const AuthController = require( '../auth/auth.controller' );

router.get( '/', AuthController.checkLogin, CheckoutController.getAll );
router.get( '/:id', AuthController.checkLogin, CheckoutController.get );
router.post( '/', AuthController.checkLogin, CheckoutController.insert );
router.put( '/:id', AuthController.checkLogin, CheckoutController.update );
router.delete( '/:id', AuthController.checkLogin, CheckoutController.delete );
router.delete( '/', AuthController.checkLogin, CheckoutController.deleteAll );


module.exports = router;
