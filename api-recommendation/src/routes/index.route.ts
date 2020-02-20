import * as route from 'restify-router' 

const Router = route.Router
const indexRoute = new Router()

indexRoute.get('', (req, res, next)=>{
    res.send({ msg: 'API de Recomendação' })
    next()
})

export default indexRoute
