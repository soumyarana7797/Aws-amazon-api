
const { Controller } = require( '../../../system/controllers/Controller' );
const { HttpResponse } = require( '../../../system/helpers/HttpResponse' );
const { CheckoutService } = require( './checkout.service' );
const { Checkout } = require( './checkout.model' );
const checkoutDTO = require( './checkout.dto' );
const autoBind = require( 'auto-bind' ),
    checkoutService = new CheckoutService(
        new Checkout().getInstance()
    );

class CheckoutController extends Controller {

    constructor( service ) {
        super( service );
        this.dto = { ...this.dto, ...checkoutDTO };
        autoBind( this );
    }
    async insert( req, res, next ) {
        try {
            req.body.user = req.user._id;
            const response = await this.service.insert( req.body );
            const httpResponse = new HttpResponse( response.data );
            return res.status( httpResponse.statusCode ).json( httpResponse );
        } catch ( e ) {
            next( e );
        }
    }
    async update( req, res, next ) {
        const query = { 'user': req.user._id };
        req.body.user = req.user._id;
        console.log( '.............', req.body );
        try {
            console.log( query );
            const response = await this.service.update( query, new this.dto.UpdateDTO( req.body ) );

            const httpResponse = new HttpResponse( new this.dto.GetDTO( response.data ) );
            return res.status( httpResponse.statusCode ).json( httpResponse );
        } catch ( e ) {
            next( e );
        }
    }
    async getAll( req, res, next ) {
        try {
            req.query.user = req.user._id;
            const response = await this.service.getAll( req.query );
            const httpResponse = new HttpResponse( response.data.map( x => new this.dto.GetDTO( x ) ), { 'totalCount': response.total } );
            return res.status( httpResponse.statusCode ).json( httpResponse );
        } catch ( e ) {
            next( e );
        }
    }
    async deleteAll( req, res, next ) {
        const id = req.user._id;

        try {
            const response = await this.service.deleteAll( id );

            const httpResponse = new HttpResponse( { 'deleted': response.deleted } );
            return res.status( httpResponse.statusCode ).json( httpResponse );
        } catch ( e ) {
            next( e );
        }
    }

}

module.exports = new CheckoutController( checkoutService );
