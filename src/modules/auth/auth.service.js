
const { UserService } = require( '../user/user.service' );
const autoBind = require( 'auto-bind' );
const mongoose = require( 'mongoose' );

class AuthService {
    constructor( model, userModel ) {
        this.model = model;
        this.userService = new UserService( userModel );
        autoBind( this );
    }

    /**
     *
     * @param email: String
     * @param password: String
     * @returns {Promise<any>}
     */
    async login( email, password ) {
        const { data } = await this.userService.findByEmail( email, true );
        const user = data;
        if ( !user ) {
            // User not found
            const error = new Error( 'Invalid Email' );

            error.statusCode = 422;
            throw error;
        } else {
            // Process Login
            try {
                // Check Password
                const passwordMatched = await user.comparePassword( password );

                if ( !passwordMatched ) {
                    const error = new Error( 'Invalid Password' );

                    error.statusCode = 422;
                    throw error;
                }
                const token = await this.model.generateToken( user.toJSON() );

                await this.model.create( { token, 'user': new mongoose.mongo.ObjectId( user._id ) } );
                const tokenData = await this.model.findOne( { 'token': token } ).populate( 'user' );

                return { 'data': tokenData.toJSON() };
            } catch ( e ) {
                throw e;
            }

        }
    }

    async register( data ) {
        try {
            const userData = await this.userService.insert( data );
            return { 'data': userData.data };
        } catch ( error ) {
            throw error;
        }
    }

    async changePassword( id, data ) {
        try {
            return await this.userService.updatePassword( id, data );
        } catch ( error ) {
            throw error;
        }
    }

    async logout( token ) {
        try {
            return await this.model.deleteOne( { token } );
        } catch ( error ) {
            throw error;
        }
    }

    async checkLogin( token ) {
        try {
            // Check if the token is in the Database
            const tokenInDB = await this.model.countDocuments( { token } );

            if ( !tokenInDB ) {
                const error = new Error( 'Invalid Token' );

                error.statusCode = 401;
                throw error;
            }
            // Check the token is a valid JWT
            const user = await this.model.decodeToken( token );

            if ( !user ) {
                const error = new Error( 'Invalid Token' );

                error.statusCode = 401;
                throw error;
            }
            // Check the Extracted user is active in DB
            const userFromDb = await this.userService.get( user._id );

            if ( userFromDb.data ) {
                return userFromDb.data;
            }
            const error = new Error( 'Invalid Token' );

            error.statusCode = 401;
            throw error;

        } catch ( e ) {
            const error = new Error( 'Invalid Token' );

            error.statusCode = 401;
            throw error;
        }
    }

}

module.exports = { AuthService };
