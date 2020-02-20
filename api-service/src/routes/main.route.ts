import * as route from 'restify-router' 
import * as request from 'request'
import * as fs from 'fs'
let mostpopular =  require( '../data/mostpopular.json' )
let priceReduction =  require( '../data/pricereduction.json' )
const Router = route.Router
const mainRoute = new Router()

/*  Este arquivo contem a rota principal 
https://wishlist.neemu.com/onsite/impulse-core/ranking/mostpopular.json
https://wishlist.neemu.com/onsite/impulse-core/ranking/pricereduction.json
*/


mainRoute.get('', async (req, res, next)=>{



	/*
	####################################################
	#                                                  #
	#        Preparando para a leitura dos arquivos    #
	#                                                  # 
	####################################################
	*/
	
	let valuesMost = await getValues( mostpopular )
	let valuesPrice = await getValues( priceReduction )
	
	let returnedMost = await Promise.all( valuesMost )
	let returnedPrice = await Promise.all( valuesPrice )
	

	let obj = {
		mostpopular: returnedMost,
		pricereduction: returnedPrice
	}


	res.send( obj )
	//res.send({msg: 'Bem vindo a API Serviço de Recomendação'})
	next()
})



const searchProduct = (id: number) =>{
	return new Promise((resolve, reject)=> {
		request.get( `http://api_product:4000/api/product/v1/${id}`,(error, response, body) =>{
			if( error ){
				console.log('err',error);
				
			}
			
			resolve( JSON.parse( body ) )	
		})
	})
}

const  getValues = (recommendation) =>{
	return recommendation.map( async (v: any) =>{
		/* Buscando dados na api de produtos */
		let apiData: any = await searchProduct( v.recommendedProduct.id )
		return apiData
	})
}



export default mainRoute