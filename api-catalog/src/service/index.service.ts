import { Config } from './mysql'
import productService from "./product.service";

const config = new Config()
const conn = config.connection()

export default {
    product: () => productService( {conn, config} )
}