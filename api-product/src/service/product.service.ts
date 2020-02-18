const productService = deps => {
    const {conn, config} = deps
    config.setTable( 'product' )
    return {
        save: (obj: any) => {
            const action = config.save( obj )
            return action
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