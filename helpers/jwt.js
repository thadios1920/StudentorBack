const  expressJWT  = require('express-jwt')

function authJWT() {
    const secret = process.env.SECRET_KEY
    const api = process.env.API_URL
    return expressJWT({
        secret,
        algorithms : ['HS256'],
        isRevoked : isRevoked
    }).unless({
        path:[
            { url: /\/public\/servicesDem(.*)/, methods: ['GET', 'OPTIONS'] },
            {url: /\/api\/v1\/servicesOff(.*)/ , methods: ['GET', 'OPTIONS'] },
            `${api}/utilisateur/login`,
            `${api}/utilisateur/register`,
        ]
    })
}
async function isRevoked(req,payload,done) {
    if (!payload.isAdmin) {
        done(null,true)
    }
    done()
}
module.exports = authJWT