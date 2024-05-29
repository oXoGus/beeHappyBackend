const jwt = require('jsonwebtoken')


// extraction du token
const extractBearer = authorization => {

    if(typeof authorization !== 'string'){
        return false
    }

    
}


// verif de la présence du token

const checkTokenMidleware = (req, res, next) => {

    const token = req.headers.autorization && extractBearer(req.headers.autorization)
}