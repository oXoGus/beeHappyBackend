const dotenv = require("dotenv")

const mysql = require("mysql2")

const express = require("express")

const router = express.Router() // on cherche l'url sur laquelle on est pour traitée les d>

dotenv.config()

router.get("/", (req, res) => {
  const connection  = mysql.createConnection({
     host: process.env.MYSQL_HOST,
     user: process.env.MYSQL_USER,
     password: process.env.MYSQL_PASSWORD,
     socketPath: '/run/mysqld/mysqld.sock',
     database: process.env.MYSQL_DB,
     });
  connection.connect((err) => {
        if(err){
            console.log("Erreur de connexion : " + err.stack)
            res.send("Erreur de connexion : " + err.stack);
            return;
        }
        res.send("yesss")
        console.log("connection a la base de donnée réussi !")
    });
})



module.exports = router; // on renvoie l'url