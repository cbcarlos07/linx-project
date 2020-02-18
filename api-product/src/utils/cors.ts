import * as corsMiddleware from 'restify-cors-middleware'
const cors = corsMiddleware({
    preflightMaxAge: 5,
    origins: ['*'],
    allowHeaders: ['*'],
    exposeHeaders: ['*']
})

export default cors