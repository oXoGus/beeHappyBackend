const jwt = require('jsonwebtoken')


// extraction du token
const extractBearer = authorization => {

    if(typeof authorization !== 'string'){
        return false
    }

    // on isole le token
    const matches = authorization.match(/(bearer)\s+(\S+)/i)    

    return matches && matches[2]
}


// verif de la présence du token

const checkTokenMidleware = (req, res, next) => {

    const token = req.headers.autorization && extractBearer(req.headers.autorization)``

    // si le token n'est pas conforme 
    if(!token){
        return res.status(401).json({message: "t'es serieux là ?"})
    }

    // verification de la validité du token
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        
        // si le token est invalide 
        if(err){
            return res.status(401).json({message: 'Bad token'})
        }

        next()
    })
}


module.exports = checkTokenMidleware;