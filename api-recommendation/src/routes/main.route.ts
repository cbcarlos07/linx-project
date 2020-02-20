import * as route from 'restify-router' 
import * as request from 'request'


let io: any
const configMainRoute = (socketIO) => {
	io = socketIO
}

const Router = route.Router
const mainRoute = new Router()

/*  

Este arquivo contem a rota principal da api de recomendações

*/

mainRoute.get('/maxproducts/:max', async (req, res, next)=>{

	const { max } = req.params

	let maxParam = max < 10 ? 10 : max

	request.get('http://localhost:4001/api/ranking', (error, response, body)=>{
		if(error){
			res.send( JSON.parse( error ) )
		}
		//Recebendo valores do microsserviço
		let bodyResponse = JSON.parse( body )
		let mostPopular = bodyResponse.mostpopular
		let priceReduction = bodyResponse.pricereduction

		//Tratando os valores que estão disponíveis
		let popular = mostPopular.filter( (m: any) => m.status == 'AVAILABLE')
		let reduction = priceReduction.filter( (p: any) => p.status == 'AVAILABLE')

		//Montando o objeto para retorno
		let objRetorno = {
			mostpopular: popular.slice(0, (maxParam-1)),
			pricereduction: reduction.slice(0, (maxParam-1))
		}

		res.send( objRetorno)
		next()
	})
})

export  {mainRoute, configMainRoute}