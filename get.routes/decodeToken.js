const express = require("express")
const router = express.Router() // on cherche l'url sur laquelle on est pour traitée les data

const jwt = require('jsonwebtoken');

router.get("/:token", (req, res) => {
    let token = parseInt(req.params.token);
    let decodedToken = jwt.decode(token)
    return res.status(200).json({decodedToken})
})

module.exports = router; // on renvoie l'url
