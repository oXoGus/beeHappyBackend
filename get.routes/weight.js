const express = require("express")
const router = express.Router() // on cherche l'url sur laquelle on est pour traitée les data

router.get("/", (req, res) => {
    res.status(200).json({message: "weight"})// on revoie un json contenant les datas
})



module.exports = router; // on renvoie l'url