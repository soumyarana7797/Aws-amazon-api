
const { Service } = require( '../../../system/services/Service' );

class ProductService extends Service {
    constructor( model ) {
        super( model );
    }

    /**
     * Get All Items
     * @param { Object } query Query Parameters
     */
    async getAll( query ) {
        let { skip, limit, sortBy } = query;

        skip = skip ? Number( skip ) : 0;
        limit = limit ? Number( limit ) : 10;
        sortBy = sortBy ? sortBy : { 'createdAt': -1 };

        delete query.skip;
        delete query.limit;
        delete query.sortBy;

        if ( query._id ) {
            try {
                query._id = new mongoose.mongo.ObjectId( query._id );
            } catch ( error ) {
                throw new Error( 'Not able to generate mongoose id with content' );
            }
        }

        try {
            const items = await this.model.find( query ).sort( sortBy ).skip( skip ).limit( limit ).populate( 'profileImage' );

            const total = await this.model.countDocuments( query );

            return { 'data': JSON.parse( JSON.stringify( items ) ), total };
        } catch ( errors ) {
            throw errors;
        }
    }


}

module.exports = { ProductService };
