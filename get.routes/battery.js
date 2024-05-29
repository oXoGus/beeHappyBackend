const dotenv = require("dotenv")

const mysql = require("mysql2")

const express = require("express")

const router = express.Router() // on cherche l'url sur laquelle on est pour traitée les data

dotenv.config()

router.get("/:param", (req, res) => {
  const connection  = mysql.createConnection({
     host: process.env.MYSQL_HOST,
     user: process.env.MYSQL_USER,
     password: process.env.MYSQL_PASSWORD,
     socketPath: '/run/mysqld/mysqld.sock',
     database: process.env.MYSQL_DB,
     });
  param = parseInt(req.params.param)
  let data = [];
  connection.connect((err) => {
        if(err){
            console.log("Erreur de connexion : " + err.stack)
            res.send("Erreur de connexion : " + err.stack);
            return;
        }
        
	connection.query("SELECT battery, messageDateTime FROM ruche1 ORDER BY messageDateTime DESC", (err, rows) => {
            if(err) throw err;
	    connection.end()
            for(let i=0; i < param; i++){
                data.push(rows[i]); 
            }
            res.json(data)
        })
        console.log("connection a la base de donnée réussi !")
    });
})



module.exports = router; // on renvoie l'url
