const { AuthService } = require( './auth.service' );
const { Auth } = require( './auth.model' );
const { User } = require( '../user/user.model' );
const autoBind = require( 'auto-bind' );
const { HttpResponse } = require( '../../../system/helpers/HttpResponse' );
const authDTO = require( './auth.dto' );
const authService = new AuthService( new Auth().getInstance(), new User().getInstance() );
const stripe = require( 'stripe' )( 'sk_test_51I5ye6CodAddj2wmIiQM9uAAK17juqgtqw9TJkdwe3I9gLQ5QUzfduYUVbm0Xp4odDykSREGsf0t1ITJkFExATR600feGOtIm8' );

class AuthController {

    constructor( service ) {
        this.service = service;
        this.dto = authDTO;
        autoBind( this );
    }

    async login( req, res, next ) {
        try {
            const loginData = new this.dto.LoginRequestDTO( req.body );
            const response = await this.service.login( loginData.email, loginData.password );
            const httpResponse = new HttpResponse( new this.dto.LoginResponseDTO( response.data ) );
            return res.status( httpResponse.statusCode ).json( httpResponse );
        } catch ( e ) {
            console.log( 'error', e );
            next( e );
        }
    }

    async register( req, res, next ) {
        try {
            const registerData = new this.dto.RegisterRequestDTO( req.body );
            const response = await this.service.register( registerData );
            console.log( 'register response', response );
            const httpResponse = new HttpResponse( new this.dto.RegisterResponseDTO( response.data ) );
            return res.status( httpResponse.statusCode ).json( httpResponse );
        } catch ( e ) {
            next( e );
        }
    }


    async changePassword( req, res, next ) {
        try {
            const id = req.user._id;
            await this.service.changePassword( id, req.body.password );
            const httpResponse = new HttpResponse( null, { 'updated': true } );
            return res.status( httpResponse.statusCode ).json( httpResponse );
        } catch ( e ) {
            next( e );
        }
    }

    async logout( req, res, next ) {
        try {
            console.log( req );
            await this.service.logout( req.token );

            const httpResponse = new HttpResponse( null, { 'deleted': true } );
            return res.status( httpResponse.statusCode ).json( httpResponse );
        } catch ( e ) {
            next( e );
        }
    }

    async checkLogin( req, res, next ) {
        try {
            const token = this.extractToken( req );

            req.user = await this.service.checkLogin( token );
            req.authorized = true;
            req.token = token;
            next();
        } catch ( e ) {
            next( e );
        }
    }

    extractToken( req ) {
        if ( req.headers.authorization && req.headers.authorization.split( ' ' )[ 0 ] === 'Bearer' ) {
            return req.headers.authorization.split( ' ' )[ 1 ];
        } else if ( req.query && req.query.token ) {
            return req.query.token;
        }
        return null;
    }

    async payment( req, res, next ) {
        try {
            const total = req.query.total;
            console.log( 'payment request recived >>>>>', total );
            const paymentIntent = await stripe.paymentIntents.create( {
                'amount': total,
                'currency': 'inr'
            } );
            res.status( 201 ).send( {
                'clientSecret': paymentIntent.client_secret
            } );
        } catch ( e ) {
            next( e );
        }
    }


}

module.exports = new AuthController( authService );
