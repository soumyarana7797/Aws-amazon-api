

class GetDTO {
    constructor( { ...props } ) {
        this._id = props._id;
        this.title = props.title;
        this.price = props.price;
        this.rating = props.rating;
        this.profileImage = props.profileImage.path;
        this.status = props.status;

        Object.freeze( this );
    }
}


class InsertDTO {
    constructor( { ...props } ) {
        this.title = props.title;
        this.price = props.price;
        this.rating = props.rating;
        this.profileImage = props.profileImage;
        Object.freeze( this );
    }
}

class UpdateDTO {
    constructor( { ...props } ) {
        this.title = props.title;
        this.price = props.price;
        this.rating = props.rating;
        this.profileImage = props.profileImage;
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
