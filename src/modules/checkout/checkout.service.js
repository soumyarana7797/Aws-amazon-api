
const { Service } = require( '../../../system/services/Service' );

class CheckoutService extends Service {
    constructor( model ) {
        super( model );
    }

    /**
     * Update Item
     * @param { string } id Instance ID
     * @param { Object } data Updated Object
     */
    async update( query, data ) {
        try {
            console.log( query );
            const item = await this.model.create( data );

            // const item = await this.model.update( query, data, { 'upsert': true, 'new': true } );

            if ( item ) {
                return { 'data': item.toJSON() };
            }
            throw new Error( 'Something wrong happened' );
        } catch ( errors ) {
            throw errors;
        }
    }

    /**
     * Delete Item
     * @param { string } id Item ID
     */
    async delete( id ) {
        try {
            const item = await this.model.findOneAndDelete( { 'id': id } );

            if ( !item ) {
                const error = new Error( 'Item not found' );

                error.statusCode = 404;
                throw error;
            } else {
                return { 'data': item.toJSON(), 'deleted': true };
            }
        } catch ( errors ) {
            throw errors;
        }
    }

    async deleteAll( id ) {
        try {
            const item = await this.model.deleteMany( { 'user': id } );
            console.log( 'item', item );
            if ( !item ) {
                const error = new Error( 'Item not found' );

                error.statusCode = 404;
                throw error;
            } else {
                return { 'deleted': true };
            }
        } catch ( errors ) {
            throw errors;
        }
    }

}

module.exports = { CheckoutService };
