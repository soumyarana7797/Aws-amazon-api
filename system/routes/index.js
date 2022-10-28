
const express = require( 'express' );
const router = express.Router();
const pluralize = require( 'pluralize' );
const path = require( 'path' );

pluralize.addUncountableRule( 'media' );
pluralize.addUncountableRule( 'auth' );

const fs = require( 'fs' );
const { HttpError } = require( '../helpers/HttpError' );
const packageJson = require( '../../package.json' );
const modulesPath = path.resolve( `${__dirname}/../../src/modules` );
const PATHS = fs.readdirSync( modulesPath );
const moduleMapper = [];

console.log( '✔ Mapping routes' );
PATHS.forEach( ( module ) => {
    if( module !== 'index.js' ) {
        const moduleRoute = `${ module }.route.js`;

        try {
            // eslint-disable-next-line global-require
            router.use( `/${pluralize.plural( module )}`, require( path.resolve( modulesPath, module, moduleRoute ) ) );
            moduleMapper.push( {
                'Module': module,
                'Route': `/${pluralize.plural( module )}`,
                'Mapped': '✔'
            } );

        } catch ( e ) {
            console.log( e );
            moduleMapper.push( {
                'Module': module,
                'Route': `/${pluralize.plural( module )}`,
                'Mapped': '✘'
            } );
        }
    }
} );


console.table( moduleMapper );

router.get( '/', ( req, res ) => {
    res.json( { 'status': true, 'message': `Welcome to ${packageJson.name} V ${packageJson.version}` } );
} );

router.use( '*', ( req, res, next ) => {
    // 404 handler
    const error = new Error( 'Resource not found' );

    error.statusCode = 404;
    next( error );
} );

// eslint-disable-next-line no-unused-vars
router.use( ( err, req, res, next ) => {
    if( process.env.NODE_ENV !== 'production' ) {
        console.error( `[${new Date().toISOString()}]`, req.method, req.url, err.statusCode, err.message, `\n${err.stack}` );
    }
    const error = new HttpError( err );

    res.status( error.statusCode );
    res.json( error );
} );
module.exports = router;
