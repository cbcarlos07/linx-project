import * as route from 'restify-router' 
import * as lineReader from 'line-reader'
import service from '../service/index.service'
const Router = route.Router
const productRoute = new Router()

/*  Este arquivo contem a rota principal 
https://wishlist.neemu.com/onsite/impulse-core/ranking/mostpopular.json
https://wishlist.neemu.com/onsite/impulse-core/ranking/pricereduction.json
*/


productRoute.get('', (req, res, next)=>{
    res.send({msg: 'Bem vindo a API de serviços produtos'})
    next()
})

productRoute.get('/all', async (req,res, next)=>{
    try {
        res.send( await service.product().all() )
    } catch (error) {
        res.send(error)
    }
    next()
})

productRoute.get('/v1/:id', async (req,res, next)=>{
    const { sku } = req.params
    try {
        res.send( await service.product().find( sku ) )
    } catch (error) {
        res.send(error)
    }
    
    next() 
    
    
})
productRoute.get('/v2/:id', async (req,res, next)=>{
    const { sku } = req.params
    try {
        res.send( await service.product().find( sku ) )
    } catch (error) {
        res.send(error)
    }
    
    next()
})
productRoute.get('/import', async (req, res, next)=>{
    //let path = 'src/data/catalog.json'
    let path = 'src/data/object2.json'
    // let data = readJSON('../data/object.json')
    //let jsonData = JSON.parse(fs.readFileSync(path, 'utf-8'))
    const values = await lerArquivo( path )
 
    
    res.send(values)
    next()
    
    
})

const lerArquivo = async  (path) => {
   return  new Promise((resolve, reject) =>{
        let arrLine = []
        lineReader.eachLine( path, (line, last) =>{
            
            if( last ){
                arrLine.push( JSON.parse( line ) )
                resolve( arrLine )

            }else{
                arrLine.push( JSON.parse( line ) )
            }

            
        })
        
        
    })
//    console.log('dados', await dados);
    
    
}

export default  productRoute