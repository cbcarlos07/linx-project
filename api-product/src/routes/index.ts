
/*
Configurando rotas
*/

import * as route from 'restify-router' 
const Router = route.Router
const router = new Router()
const initRoute = new Router()
/*
Importando rotas
*/
import mainRoute from './main.route'
import productRoute from './product.route'
const routes = server =>{
    router.add('/product', productRoute)
    
    initRoute.add('/', mainRoute)
    initRoute.add( '/api', router )
    initRoute.applyRoutes( server )
}
export default routes