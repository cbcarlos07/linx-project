import * as restify from 'restify'
import routes from "../routes"
import cors from '../utils/cors'
import addData from '../utils/savejson'
import * as socketServer from 'socket.io'
import * as socketClient from 'socket.io-client'
import * as os from 'os'

class Application {
    port: any
    host: any
    server: any
    io: SocketIO.Server
    socket: any
    ipLocal = 'localhost'
    constructor(){
        this.ipLocal = this.getIpLocal()
        this.port = process.env.SERVER_PORT
        this.host = process.env.SERVER_HOST
        this.server = restify.createServer()
        this.io = socketServer.listen( this.server.server )
        
        this.socket = socketClient.connect( `http://api_product:4000` )
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
        routes( this.server )
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
            if( addData( msg ) ){
                //caso os dados sejam adicionados com sucesso envia sinal para a api que se comunica com o frontend
                this.io.emit('recommended', msg)
            }
        })

      
    }

    getIpLocal(){
        const ifaces = os.networkInterfaces()
        
        let getIP = Object.keys(ifaces).map( ifname =>{
            
            let ip = ifaces[ifname].map( iface => iface.address )
            return ip[0]
        })
        let ipLocal = getIP[0]
        return ipLocal
     
    }

}

export default new Application