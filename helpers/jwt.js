const  expressJWT  = require('express-jwt')

function authJWT() {
    const secret = process.env.SECRET_KEY
    const api = process.env.API_URL
    return expressJWT({
        secret,
        algorithms : ['HS256'],
        // isRevoked : isRevoked
    }).unless({
        path:[
            { url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS'] },
            {url: /\/api\/v1\/servicesOff(.*)/ , methods: ['GET', 'OPTIONS'] },
            `${api}/utilisateur/login`,
            `${api}/utilisateur/register`,
        ]
    })
}

// http://localhost:5353/public/uploads/user.png-1669813392732.png
// async function isRevoked(req,payload,done) {
//     if (!payload.isAdmin) {
//         done(null,true)
//     }
//     done()
// }
module.exports = authJWT