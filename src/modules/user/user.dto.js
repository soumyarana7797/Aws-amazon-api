

class GetDTO {
    constructor( { ...props } ) {
        this._id = props._id;
        this.name = props.name;
        this.email = props.email;
        Object.freeze( this );
    }
}


module.exports = { GetDTO };
