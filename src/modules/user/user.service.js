
const { Service } = require( '../../../system/services/Service' );
const autoBind = require( 'auto-bind' );

class UserService extends Service {
    constructor( model ) {
        super( model );
        this.model = model;
        autoBind( this );
    }


    async updatePassword( id, data ) {
        try {
            const user = await this.model.findById( id );
            user.password = data;
            await user.save();
            return { 'passwordChanged': true };
        } catch ( errors ) {
            throw errors;
        }
    }

    /**
     *
     * @param email : string
     * @param includePassword : boolean
     * @returns {Promise<*>}
     */
    async findByEmail( email, includePassword = false ) {
        let data;
        if ( includePassword ) {
            data = await this.model.findByEmail( email ).select( '+password' );
        } else {
            data = await this.model.findByEmail( email );
        }
        return { data };
    }
}

module.exports = { UserService };
