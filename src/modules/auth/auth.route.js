
const AuthController = require( './auth.controller' );
const express = require( 'express' ),
    router = express.Router();

router.post( '/login', AuthController.login );
router.get( '/logout', AuthController.logout );
router.post( '/register', AuthController.register );
router.post( '/change-password', AuthController.checkLogin, AuthController.changePassword );

router.post( '/payments/create', AuthController.payment );

module.exports = router;
