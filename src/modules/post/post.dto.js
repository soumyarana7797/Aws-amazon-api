

class GetDTO {
    constructor( { ...props } ) {
        this._id = props._id;
        this.basket = props.basket;
        this.amount = props.amount;
        this.user = props.user;
        this.created = props.created;
        Object.freeze( this );
    }
}


class InsertDTO {
    constructor( { ...props } ) {
        this.basket = props.basket;
        this.amount = props.amount;
        this.user = props.user;
        this.created = props.created;
        Object.freeze( this );
    }
}

class UpdateDTO {
    constructor( { ...props } ) {
        this.basket = props.basket;
        this.amount = props.amount;
        this.user = props.user;
        // Delete Fields which are not present in data
        Object.keys( this ).forEach( key => {
            if ( this[ key ] === undefined ) {
                delete this[ key ];
            }
        } );
        Object.freeze( this );
    }
}

module.exports = { GetDTO, InsertDTO, UpdateDTO };
