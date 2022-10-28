
const mongoose = require( 'mongoose' );
const { Schema } = require( 'mongoose' );
const uniqueValidator = require( 'mongoose-unique-validator' );

class Product {

    initSchema() {
        const schema = new Schema( {
            'id': {
                'type': String,
                'required': false,
            },
            'title': {
                'type': String,
                'required': false,
            },
            'price': {
                'type': Number,
                'required': false,
            },
            'rating': {
                'type': Number,
                'required': false,
            },
            'profileImage': {
                'type': Schema.Types.ObjectId,
                'required': false,
                'default': null,
                'ref': 'media'
            },
            'status': {
                'type': Boolean,
                'required': true,
                'default': true
            }
        }, { 'timestamps': true } );

        schema.plugin( uniqueValidator );
        try {
            mongoose.model( 'product', schema );
        } catch ( e ) {

        }

    }

    getInstance() {
        this.initSchema();
        return mongoose.model( 'product' );
    }
}

module.exports = { Product };
