import * as route from 'restify-router'
import {mainRoute, configMainRoute} from "./main.route";
import indexRoute from "./index.route";

const Router = route.Router
const router = new Router()
const routerIndex = new Router()

const routes = deps =>{
    const {server, io} = deps
    configMainRoute( io )
    router.add( '/ranking', mainRoute )

    routerIndex.add('/', indexRoute)
    routerIndex.add('/api', router)
    routerIndex.applyRoutes( server )
}

export default routes

