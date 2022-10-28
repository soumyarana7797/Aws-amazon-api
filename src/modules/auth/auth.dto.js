
const { GetDTO } = require( '../user/user.dto' );

class LoginRequestDTO {
    constructor( { ...props } ) {
        this.email = props.email;
        this.password = props.password;
        Object.freeze( this );
    }
}

class LoginResponseDTO {
    constructor( { ...props } ) {
        this.token = props.token;
        this.user = new GetDTO( props.user );
        Object.freeze( this );
    }
}

class RegisterRequestDTO {
    constructor( { ...props } ) {
        this.name = props.name;
        this.email = props.email;
        this.password = props.password;
        Object.freeze( this );
    }
}

class RegisterResponseDTO extends GetDTO {
    constructor( { ...props } ) {
        super( props );
    }
}

class JWTSignDTO {
    constructor( { ...props } ) {
        this._id = props._id.toString();
        this.email = props.email;
        this.businessName = props.businessName;
        Object.freeze( this );
    }
}

module.exports = { LoginRequestDTO, LoginResponseDTO, RegisterRequestDTO, RegisterResponseDTO, JWTSignDTO };
