import * as restify from 'restify'
import routes from "../routes"
import cors from '../utils/cors'
import * as bodyParser from 'body-parser'
import * as socketServer from 'socket.io'
class Application {
    port: any
    host: any
    server: any
    io: SocketIO.Server
    constructor(){
        this.port = process.env.SERVER_PORT
        this.host = process.env.SERVER_HOST
        this.server = restify.createServer()
        this.io = socketServer.listen( this.server.server )
    }

    listen(){
        this.realtime()
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
        routes( {server: this.server, io: this.io})
    }

    realtime(){
        /*############################################
       #                                             #
       #   Esta função é usada para enviar sinais    #
       # para as páginas que estão conectadas a esta #
       # api através do socket.io em tempo real      #
       #                                             #
       ############################################*/
       
        this.io.on('connection', socket => {
            socket.on( 'recommended', obj =>{
                socket.broadcast.emit('recommended', obj)
            })
        })
        
    }

}

export default new Application