const dotenv = require("dotenv")

const mysql = require("mysql2")

const express = require("express")
const router = express.Router() // on cherche l'url sur laquelle on est pour traitée les data

dotenv.config()

router.get("/", (req, res) => {
    // faire une route get pour l'API qui renvoie le poid de la ruche
    const connection = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: 'rucheDB',
    }); // connection a la db

    connection.connect((err) => {
        if(err){
            console.log("Erreur de connexion : " + err.stack)
            res.send("Erreur de connexion : " + err.stack);
            return;
        }
        console.log("connection a la base de donnée réussi !")
        connection.query("SELECT poids FROM ruche", (err, rows) => {
            if(err) throw err;
            res.json({weight: rows[rows.length-1].poids}); // on envoie la derniere valeur de poids de la ruche
        })
    });
})


module.exports = router; // on renvoie l'url