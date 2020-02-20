const productService = deps => {
    const {conn, config} = deps
    config.setTable( 'product' )
    return {
        save: (obj: any) => {
            const action = config.save( obj )
            return action
        },
        saveMultiple: (obj: any) =>{
            return new Promise((resolve, reject)=>{
                let queryString = 'INSERT INTO product VALUES ?'
                let queryData = [obj]
                conn.getConnection((error, connection)=>{
                    if(error) {
                        console.log('connection', error);
                        
                        reject(error)
                        return
                    } 
                    connection.query(queryString, queryData, (err, result)=>{
                        connection.release()
                        if(err) reject( err )
                        resolve( result )
                    })
                })
            })
        },
        update: (obj: any) => {
            const action = config.update( obj )
            return action
        },
        all: () => {
            const action = config.findAll(  )
            return action
        },
        find: (id: number) => {
            const action = config.findById( id )
            return action
        },
        findFields: (id: number) =>{
            return new Promise((resolve, reject)=>{
                let queryString = `SELECT name, price, status, categories FROM product WHERE sku = ?`
                let queryData   = [id]
                conn.getConnection((error, connection)=>{
                    if(error) reject(error)
                    connection.query(queryString, queryData, (err, results)=>{
                        if(err){
                            reject(err)
                            return
                        }
                        resolve(results)
                    })
                })
            })
        }
        
        
    }
}

export default productService