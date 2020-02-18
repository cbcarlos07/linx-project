require('dotenv').config()
//const test = require( 'ava') /*
import * as test from 'ava'
import { Config } from '../service/mysql'
import productService from "../service/product.service";

/*test.serial('foo', t => {
    t.pass();
}); */

const config = new Config()
const conn = config.connection()

const helperModule = productService({conn, config})

const create = () => {
    return helperModule.save({
        "sku": 992563,
        "name": "Caneca Pote com Canudo 500ml Zona Criativa Coruja Roxa - 8991",
        "price": 399.9,
        "oldprice": 399.9,
        "count": 10,
        "countprice": 39.9,
        "image1": "//d1h4n7nr93grs2.cloudfront.net/Custom/Content/Products/11/10/1110982_p-9091_m1_636935451960502787.jpg",
        "status": "AVAILABLE",
        "categories": "Utilidades Domésticas"
    })
}

test.beforeEach( t => {
    conn.getConnection((error, connection)=>{
        if(error) return
        connection.query('TRUNCATE TABLE product', (err, response)=>{
            if(err) return
        })
    })
  
})
test.after.always( t => {
    conn.getConnection((error, connection)=>{
        if(error) return
        connection.query('TRUNCATE TABLE product', (err, response)=>{
            if(err) return
        })
    })
})     

test.serial('Show products', async t => {
    await create()
    const list = await helperModule.all()
    t.is( list.length, 1  )
})
/*
import 'jest'
import * as request from 'supertest'

let address: string = (<any>global).address

test('all products', ()=>{
    return request(address)
                .get('/api/product/all')
                .then( response =>{
                    expect(response.status).toBe(200)
                })
})*/