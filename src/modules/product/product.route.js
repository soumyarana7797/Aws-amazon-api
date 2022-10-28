
const ProductController = require( './product.controller' );
const express = require( 'express' ),
    router = express.Router();
// const AuthController = require( '../auth/auth.controller' );

router.get( '/', ProductController.getAll );
router.get( '/:id', ProductController.get );
router.post( '/', ProductController.insert );
router.put( '/:id', ProductController.update );
router.delete( '/:id', ProductController.delete );


module.exports = router;
