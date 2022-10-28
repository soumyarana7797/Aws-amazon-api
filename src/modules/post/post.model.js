
const mongoose = require( 'mongoose' );
const { Schema } = require( 'mongoose' );
const uniqueValidator = require( 'mongoose-unique-validator' );

class Post {

    initSchema() {
        const schema = new Schema( {
            'basket': [],
            'user': {
                'type': Schema.Types.ObjectId,
                'required': true,
                'default': null,
                'ref': 'user'
            },
            'amount': {
                'type': Number,
                'required': false,
            },
            'created': {
                'type': Number,
                'required': false,
            }
        }, { 'timestamps': true } );

        schema.plugin( uniqueValidator );
        try {
            mongoose.model( 'post', schema );
        } catch ( e ) {

        }

    }

    getInstance() {
        this.initSchema();
        return mongoose.model( 'post' );
    }
}

module.exports = { Post };
