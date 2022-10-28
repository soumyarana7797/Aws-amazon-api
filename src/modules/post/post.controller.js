
const { Controller } = require( '../../../system/controllers/Controller' );
const { HttpResponse } = require( '../../../system/helpers/HttpResponse' );
const { PostService } = require( './post.service' );
const { Post } = require( './post.model' );
const postDTO = require( './post.dto' );
const autoBind = require( 'auto-bind' ),
    postService = new PostService(
        new Post().getInstance()
    );

class PostController extends Controller {

    constructor( service ) {
        super( service );
        this.dto = { ...this.dto, ...postDTO };
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

}

module.exports = new PostController( postService );
