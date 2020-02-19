import * as route from 'restify-router' 
import mainRoute from './main.route'
const Router = route.Router
const initRoute = new Router()


const routes = server =>{
    initRoute.add( '/api/ranking', mainRoute )
    initRoute.applyRoutes( server )
}
export default routes