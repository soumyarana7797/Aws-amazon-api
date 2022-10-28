
const MediaController = require( './media.controller' );
const express = require( 'express' ),
    router = express.Router();
const AuthController = require( '../auth/auth.controller' );

router.get( '/:id', AuthController.checkLogin, MediaController.get );
router.post( '/', MediaController.upload.single( 'file' ), MediaController.insert );
router.delete( '/:id', AuthController.checkLogin, MediaController.delete );


module.exports = router;
