
const mongoose = require( 'mongoose' );
const { Schema } = require( 'mongoose' );
const uniqueValidator = require( 'mongoose-unique-validator' );

class Checkout {

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
            'image': {
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
            'user': {
                'type': Schema.Types.ObjectId,
                'required': true,
                'default': null,
                'ref': 'user'
            },
            'status': {
                'type': Boolean,
                'required': true,
                'default': true
            }
        }, { 'timestamps': true } );

        schema.plugin( uniqueValidator );
        try {
            mongoose.model( 'checkout', schema );
        } catch ( e ) {

        }

    }

    getInstance() {
        this.initSchema();
        return mongoose.model( 'checkout' );
    }
}

module.exports = { Checkout };
