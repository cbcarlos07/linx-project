const mysql = require('mysql')

const conn = mysql.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PWD
})


const save = ( table, obj ) => {
    const insert = new Promise((resolve, reject)=>{
        const queryString = this.mountInsert(table, obj )
        const data        = this.valuesInsert( obj )      
        this.conn.getConnection((error, connection)=>{
            if( error ){
                this.errorHandler(error, 'Falha ao atentar conectar para inserir', reject)
                reject({status: false, msg: 'Error'})
            }
            connection.query(queryString, data, (err, result)=>{
                connection.release()
                if( err ){
                    this.errorHandler(err, `Falha ao tentar salvar ${this.table}`, reject)
                    reject({status: false, msg: 'Error'})
                    return false
                }
                resolve({result, status: true, msg: 'Item salvo com sucesso'})
            })
        })
    })
    return insert;         
}

const update = (table,  obj ) => {
    return new Promise((resolve, reject)=>{
        const queryString = this.mountUpdate( obj )
        const data        = this.valuesUpdate( table, obj )
        this.conn.getConnection((error, connection)=>{
            if(error){
                this.errorHandler(error, `Falha ao tentar conectar`, reject)
                return
            }
            connection.query(queryString, data, (err, result)=>{
                connection.release()
                if( err ){
                    this.errorHandler(err, `Falha ao tentar atualizar ${this.table}`, reject)
                    return false
                }
                if( result.affectedRows == 0 ){
                    resolve({result, status: true, msg: 'Nada foi atualizado!'})
                }
                resolve({result, status: true, msg: 'Item atualizado com sucesso!'})
            })
        })    
    })      
}

const valuesInsert =( obj ) => {
    let insert = []
    for( const prop in obj ){
        insert.push( obj[prop] )
    }
    return insert
}

const valuesUpdate = ( obj ) => {
    let update = []
    var keys = Object.keys(obj);
    var first = keys[0];            
    var index = 0
    for(const prop in obj){
        
        if( !(index == 0)  ){
            update.push( obj[prop] )
        }
        index++
    }
    update.push( obj[first] )            
    return update
}

const mountInsert = (table,  obj ) =>{
    let insert = `INSERT INTO ${table}`
    let values = ''
    let fields = ''
    for (const key in obj) {
        values += '?, '
        fields += `${key}, `
    }
    values = values.substring( 0, values.length - 2 )
    fields = fields.substring( 0, fields.length - 2 )
    insert += `(${fields}) VALUES(${values})`
    return insert
}

const mountUpdate = (table, obj) => {
    let update = `UPDATE ${table} SET `
    let values = ''
    let fields = obj
    var keys = Object.keys(obj);
    var first = keys[0];            
    var index = 0
    for(const prop in fields){
        
        if( !(index == 0)  ){
            values += `${prop} = ?, `
        }
        index++
    }
    values = values.substring(0, values.length -2)
    update += `${values} WHERE ${first} = ?`
    return update
}

const findById = ( id ) => {
    return new Promise((resolve, reject)=>{
        const queryString = `SHOW COLUMNS FROM ${this.table};`
        this.conn.getConnection((error, connection)=>{
            if(error){
                this.errorHandler(error, `Problema ao tentar buscar em ${this.table}`, reject)
                return
            }
            connection.query(queryString, (err, result)=>{
                connection.release()
                if(err) {
                    reject(err)
                    return false
                }
                const field = result[0].Field
                const select = `SELECT * FROM ${this.table} WHERE ${field} = ?`
                const data = [ id ]
                this.conn.getConnection((error1, connection1)=>{
                    if(error1){
                        this.errorHandler(error1, `Problema ao tentar buscar em ${this.table}`, reject)
                    }
                    connection1.query( select, data, (err, results) =>{
                        connection1.release()
                        if( err ){
                            this.errorHandler(err, `Problema ao tentar buscar em ${this.table}`, reject)
                            return false
                        }
                        resolve(results[0])
                    })
                })
            })

        })
    })
}

const findAll = ( order = '' ) => {
    return new Promise((resolve, reject)=>{
        const queryString = `SELECT * FROM ${this.table} ${order}`
        this.conn.getConnection((error, connection)=>{
            if(error){
                this.errorHandler(error, `Falha ao tentar buscar ${this.table}`, reject)
                return
            }
            connection.query(queryString, (err, result)=>{
                connection.release()
                if(err) {
                    this.errorHandler(err, `Falha ao tentar buscar ${this.table}`, reject)
                    return false
                }
                resolve(result)
            })
        })
    })
}

const remove = ( id ) => {
    const dados = new Promise((resolve, reject)=>{
        const queryString = `SHOW COLUMNS FROM ${this.table};`
        this.conn.getConnection((error, connection)=>{
            if(error){
                reject(error)
                return
            }
            connection.query(queryString, (err, result)=>{
                connection.release()
                if(err) {
                    reject(err)
                    return false
                }
                const field = result[0].Field
                const select = `DELETE FROM ${this.table} WHERE ${field} = ?`
                const data = [ id ]
                this.conn.getConnection((error1, connection1)=>{
                    if(error1){
                        this.errorHandler(err, `Problema ao tentar remover de ${this.table}`, reject)
                        return
                    }
                    connection1.query( select, data, (err, results) =>{
                        connection1.release()
                        if( err ){
                            this.errorHandler(err, `Problema ao tentar remover de ${this.table}`, reject)
                            return false
                        }
                        resolve({results, status: true, msg: 'Item removido com sucesso'})
                    })
                })
            })
        })
    })
    
    const campo = dados
    return campo
}


const errorHandler = (error, msg, rejectFunction) => {
    console.log('Error: ', error);
    rejectFunction(500, {error: msg, log: error, status: false})        
}

module.exports  = {conn, errorHandler, save, update, findById, findAll, remove}
