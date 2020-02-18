const route = require('restify-router')
const Router = route.Router
const productRoute = new Router()
const fs = require('fs')
/*  Este arquivo contem a rota principal 

    https://wishlist.neemu.com/onsite/impulse-core/ranking/mostpopular.json
    https://wishlist.neemu.com/onsite/impulse-core/ranking/pricereduction.json
*/


productRoute.get('', (req, res, next)=>{
    res.send({msg: 'Bem vindo a API de serviços produtos'})
    next()
})

productRoute.get('/import', (req, res, next)=>{
    let path = 'src/data/catalog.json'
   // let data = readJSON('../data/object.json')
    let jsonData = JSON.parse(fs.readFileSync(path, 'utf-8'))
    res.send(jsonData)
    next()
    
})

const readJSON = (path, cb ) => {
    fs.readFile(require.resolve( path ), (err, data) =>{
        if(err)
            cb(err)
        else
            cb(null, JSON.parse(data))    
    })
}

module.exports = productRoute