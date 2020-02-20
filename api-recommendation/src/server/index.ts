import * as restify from 'restify'
import routes from "../routes"
import cors from '../utils/cors'
import * as socketServer from 'socket.io'
import * as socketClient from 'socket.io-client'

class Application {
    port: any
    host: any
    server: any
    io: SocketIO.Server
    socket: any
    constructor(){
        this.port = process.env.SERVER_PORT
        this.host = process.env.SERVER_HOST
        this.server = restify.createServer()
        this.io = socketServer.listen( this.server.server )
        this.socket = socketClient.connect( `http://${process.env.SERVER_API}:4001` )
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
    }

    configRoutes(){
        routes( {server: this.server, io: this.io} )
    }

    realtime(){
        /*############################################
       #                                             #
       #   Esta função é usada para enviar sinais    #
       # para as páginas que estão conectadas a esta #
       # api através do socket.io em tempo real      #
       #                                             #
       ############################################*/
        this.io.on('connection', socket =>{
            socket.on('recommended', msg =>{
                socket.broadcast.emit('recommended', msg)
            })
        })
        //Esta parte está na escuta de envio de sinais da api da porta 4000
        this.socket.on('recommended', msg =>{
            this.io.emit('recommended', msg)
        })

      
    }



}

export default new Application