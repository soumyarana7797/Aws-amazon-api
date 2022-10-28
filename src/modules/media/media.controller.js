
const { Controller } = require( '../../../system/controllers/Controller' );
const { MediaService } = require( './media.service' );
const { Media } = require( './media.model' );
const autoBind = require( 'auto-bind' );
const multer = require( 'multer' );
const fs = require( 'fs' );
const { HttpResponse } = require( '../../../system/helpers/HttpResponse' );
const { slugify } = require( '../../shared/utility' );
const config = require( '../../../config/config' ).getConfig();
const mediaService = new MediaService(
    new Media().getInstance()
);

class MediaController extends Controller {

    // file upload using multer
    storage = multer.diskStorage( {
        'destination': function( req, file, cb ) {
            const dir = config.UPLOAD_PATH;

            fs.exists( dir, ( exist ) => {
                if ( !exist ) {
                    return fs.mkdir( dir, ( error ) => cb( error, dir ) );
                }
                return cb( null, dir );
            } );
        },
        'filename': function( req, file, cb ) {
            const fileOriginalName = slugify( file.originalname );

            cb( null, `${( new Date() ).getTime() }-${ fileOriginalName}` );
        }
    } );
    upload = multer( {
        'storage': this.storage,
        'limits': {
            'fileSize': 1024 * 1024 * 5
        }
    } );

    constructor( service ) {
        super( service );
        autoBind( this );
    }

    async insert( req, res, next ) {
        try {
            const uploadPath = config.UPLOAD_PATH;
            console.log( uploadPath );
            req.file.path = req.file.path.split( `${uploadPath }` )[ 1 ];
            req.file.path = req.file.path.substring( 1 );
            const response = await this.service.insert( req.file );
            const httpResponse = new HttpResponse( response.data );
            return res.status( httpResponse.statusCode ).json( httpResponse );
        } catch ( e ) {
            next( e );
        }
    }

    fileFilter = ( req, file, cb ) => {
        // reject a file
        if ( file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif' ) {
            cb( null, true );
        } else {
            cb( null, false );
        }
    };

    async delete( req, res, next ) {
        const { id } = req.params;

        try {
            const response = await this.service.delete( id );
            // File Unlinking..

            if ( response.data.path ) {
                // console.log( 'unlink item', response.data.path );
                fs.unlink( response.data.path, ( err ) => {
                    if ( err ) {
                        // console.log( 'error deleting file' );
                        throw err;
                    }
                    // console.log( 'File deleted!' );
                } );
            }
            const httpResponse = new HttpResponse( response.data );
            return res.status( httpResponse.statusCode ).json( httpResponse );
        } catch ( e ) {
            next( e );
        }
    }

}

module.exports = new MediaController( mediaService );
