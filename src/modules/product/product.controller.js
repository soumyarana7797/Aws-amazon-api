
const { Controller } = require( '../../../system/controllers/Controller' );
// const { HttpResponse } = require( '../../../system/helpers/HttpResponse' );
const { ProductService } = require( './product.service' );
const { Product } = require( './product.model' );
const productDTO = require( './product.dto' );
const autoBind = require( 'auto-bind' ),
    productService = new ProductService(
        new Product().getInstance()
    );

class ProductController extends Controller {

    constructor( service ) {
        super( service );
        this.dto = { ...this.dto, ...productDTO };
        autoBind( this );
    }

}

module.exports = new ProductController( productService );
