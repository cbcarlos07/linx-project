import * as fs from 'fs'
const pathMostPopular = '/data/mostpopular.json'
const pathPriceReduction= '/data/pricereduction.json'
const mostpopular = require( `../${pathMostPopular}` )
const priceReduction = require( `../${pathPriceReduction}` )


const addData = (product) => {
    let dataObj = []
    let obj = {}
    let path = ''
    if( product.type == 'most' ){

        obj = {
            "weight": 0,
            "recommendedProduct": {
                "id": product.id
            }
        }
    
        mostpopular.push( obj )
        dataObj = mostpopular
        path = pathMostPopular
    }else{
        obj = {
            "weight": 0,
            "recommendedProduct": {
                "id": product.id
            }
        }
    
        priceReduction.push( obj )
        dataObj = priceReduction
        path = pathPriceReduction
    }
    

    let data = JSON.stringify( dataObj )

    fs.writeFileSync( `src/${path}`, data )
    return true
}

export default addData



