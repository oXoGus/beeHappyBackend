const express = require("express")
const router = express.Router() // on cherche l'url sur laquelle on est pour traitée les data

router.post("/", (req, res) => {
    res.status(200).json({message: "battery"})// on revoie un json contenant les datas
})



module.exports = router; // on renvoie l'url