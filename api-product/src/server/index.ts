import * as restify from 'restify'
import routes from "../routes"
import cors from '../utils/cors'
import * as bodyParser from 'body-parser'

class Application {
    port: any
    host: any
    server: any

    constructor(){
        this.port = process.env.SERVER_PORT
        this.host = process.env.SERVER_HOST
        this.server = restify.createServer()
    }

    listen(){
        this.configCors()
        this.configRoutes()
        this.server.listen( this.port, this.host, () =>{
            console.log(`Server is listening on port ${this.port}`)
        })
    }

    configCors(){
        this.server.pre( cors.preflight )
        this.server.use( cors.actual )
        this.server.use( bodyParser.json() )
        this.server.use( bodyParser.urlencoded({extended: true}) )
    }

    configRoutes(){
        routes( this.server )
    }
}

export default new Application