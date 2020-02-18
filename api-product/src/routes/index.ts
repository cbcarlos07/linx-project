
/*
Configurando rotas
*/

import * as route from 'restify-router' 
const Router = route.Router
const router = new Router()

/*
Importando rotas
*/
import mainRoute from './main.route'
import productRoute from './product.route'
const routes = server =>{
    router.add('/', mainRoute)
    router.add('/product', productRoute)
    router.applyRoutes( server )
}
export default routes