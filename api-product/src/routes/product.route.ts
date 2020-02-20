import * as route from 'restify-router' 
import * as lineReader from 'line-reader'
import service from '../service/index.service'
const Router = route.Router
const productRoute = new Router()

/*  Este arquivo contem a rota principal 
https://wishlist.neemu.com/onsite/impulse-core/ranking/mostpopular.json
https://wishlist.neemu.com/onsite/impulse-core/ranking/pricereduction.json
*/
var io: any
const productRoutes = socket => {
    io = socket
}

productRoute.get('', (req, res, next)=>{
    res.send({msg: 'Bem vindo a API de serviços produtos'})
    next()
})

productRoute.post('', async (req, res, next)=>{
    res.send( await service.product().save( req.body ) )
    next()
})

productRoute.post('/recommended', async (req, res, next)=>{  
    io.emit( 'recommended', req.body )
    
    res.send( req.body )
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

productRoute.get('/v1/:sku', async (req,res, next)=>{
    const { sku } = req.params
    try {
        res.send( await service.product().find( sku ) )
    } catch (error) {
        res.send(error)
    }
    
    next() 
    
    
})
productRoute.get('/v2/:sku', async (req,res, next)=>{
    const { sku } = req.params
    try {
        res.send( await service.product().find( sku ) )
    } catch (error) {
        res.send(error)
    }
    
    next()
})
productRoute.get('/import', async (req, res, next)=>{
    /*
        Readying to read of file
    */
    
   salvarArquivo()
    
    try {
        //Sending to database
        res.send( {msg: 'Salvando dados'} )
        
    } catch (error) {
        res.send(error)
    }

    next()
    
    
})

//Função responsável de ler o arquivo json

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
    
}

const salvarArquivo = async () =>{
    let path = 'src/data/catalog.json'
    const values: any = await lerArquivo( path )
    let val = values.map( (v: any) =>{
        /* Readyng fields to be inserts */
       
        try {
            
            let sku = v.skus[0].sku
            let name = v.skus[0].properties.name
            let price = v.skus[0].properties.price
            let oldPrice = v.skus[0].properties.oldPrice
            let count = v.skus[0].properties.installment.count
            let countPrice = v.skus[0].properties.installment.price
            let image = v.skus[0].properties.images.default 
            let status = v.status
            let categories = v.categories[0].name
            let obj = [sku, name, price, oldPrice, count, countPrice, image, status, categories]
            return obj
        } catch (error) {
            
        }
        
    })

   let insert =  await service.product().saveMultiple( val )
   console.log('insert', insert);
   

}

export   {productRoute, productRoutes }