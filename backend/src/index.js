require('dotenv').config()
const server = require('./server')
const port = process.env.DB_SERVER
server.listen( port, ()=>{
    console.log(`Api listening on port ${port}`);
})