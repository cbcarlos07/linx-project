import * as route from 'restify-router' 
import * as request from 'request'
import * as fs from 'fs'
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
	let path = 'src/data/mostpopular.json'
	const data: any = await lerArquivo( path )
	let values = data.map( async (v: any) =>{
		/* Buscando dados na api de produtos */
		let apiData = await searchProduct( v.recommendedProduct.id )
		return apiData
		
	
	})
	let returnedData = await Promise.all( values )
	res.send( returnedData )
	//res.send({msg: 'Bem vindo a API Serviço de Recomendação'})
	next()
})

//Função responsável de ler o arquivo json

const lerArquivo = async  (path) => {
	return  new Promise((resolve, reject) =>{
		let content = ''
		
		fs.readFile( path, (err, data) =>{
			content = JSON.parse(data.toString())
			resolve( content )
		})
		
	})
	
}

const searchProduct = (id: number) =>{
	return new Promise((resolve, reject)=> {
		request.get( `http://localhost:4000/api/product/v1/${id}`,(error, response, body) =>{
			resolve( JSON.parse( body ) )	
		})
	})
}



export default mainRoute