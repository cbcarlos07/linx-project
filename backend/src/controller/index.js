/*
Configurando rotas
*/

const route = require('restify-router')
const Router = route.Router
const router = new Router()

/*
Importando rotas
*/
const mainRoute = require('./main.route')
const productRoute = require('./product.route')
const routes = server =>{
    router.add('/', mainRoute)
    router.add('/product', productRoute)
    router.applyRoutes( server )
}
module.exports = routes