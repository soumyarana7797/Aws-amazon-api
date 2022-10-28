

class GetDTO {
    constructor( { ...props } ) {
        this._id = props._id;
        this.id = props.id;
        this.title = props.title;
        this.image = props.image;
        this.price = props.price;
        this.rating = props.rating;
        this.user = props.user;
        this.status = props.status;

        Object.freeze( this );
    }
}


class InsertDTO {
    constructor( { ...props } ) {
        this.id = props.id;
        this.title = props.title;
        this.image = props.image;
        this.price = props.price;
        this.rating = props.rating;
        this.user = props.user;
        Object.freeze( this );
    }
}

class UpdateDTO {
    constructor( { ...props } ) {
        this.id = props.id;
        this.title = props.title;
        this.image = props.image;
        this.price = props.price;
        this.rating = props.rating;

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
