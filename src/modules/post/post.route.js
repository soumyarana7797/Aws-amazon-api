
const PostController = require( './post.controller' );
const express = require( 'express' ),
    router = express.Router();
const AuthController = require( '../auth/auth.controller' );

router.get( '/', AuthController.checkLogin, PostController.getAll );
router.get( '/:id', AuthController.checkLogin, PostController.get );
router.post( '/', AuthController.checkLogin, PostController.insert );
router.put( '/:id', AuthController.checkLogin, PostController.update );
router.delete( '/:id', AuthController.checkLogin, PostController.delete );


module.exports = router;
