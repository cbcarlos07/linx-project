import * as route from 'restify-router' 
const Router = route.Router
const mainRoute = new Router()

/*  Este arquivo contem a rota principal 

    https://wishlist.neemu.com/onsite/impulse-core/ranking/mostpopular.json
    https://wishlist.neemu.com/onsite/impulse-core/ranking/pricereduction.json
*/


mainRoute.get('', (req, res, next)=>{
    res.send({msg: 'Bem vindo a API de produtos'})
    next()
})

export default mainRoute