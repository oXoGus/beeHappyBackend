const dotenv = require("dotenv")
const mysql = require("mysql2")
const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const router = express.Router() // on cherche l'url sur laquelle on est pour traitée les data

dotenv.config()



router.put("/", (req, res) => {
    // on recup les données de la requette
    const  { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({message: 'missing data'})
    }

    const connection  = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        socketPath: '/run/mysqld/mysqld.sock',
        database: process.env.MYSQL_DB,
    });
    
    connection.connect((err) => {
        if(err){
            console.log("Erreur de connexion a la DB : " + err.stack)
            res.status(500).send("Erreur de connexion a la DB : " + err.stack);
            connection.end();
            return;
        }

        // verifaication que l'utilisateur n'existe pas 
        connection.query("SELECT * FROM rucheAdmin WHERE email = ?", [email], (err, rows) => {
            //res.status(401).json({debugger : 'query', err, rows})
            if(err) throw err;
            
            
            // on check si il y a bien un utilisateur avec cette email
            try {
                rows[0]['email'];
                connection.end();
                return res.status(401).json({message: 'email déja utilisée'})

            // si il n'y a pas d'utilisateur existant    
            } catch (error) {
                //hashage de mot de passe
                //res.status(401).json({debugger : 'catch'})
                bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT))
                .then(hash => {
                    //res.status(401).json({debugger : 'then'})
                    connection.query("INSERT INTO rucheAdmin (email, password) VALUES (?, ?) ", [email, hash], (err, rows) => {
                        //res.status(401).json({debugger : 'query', err})
                        if(err) throw err;
                        connection.end();

                        return res.status(200).json({success : true});
                    })
                })
                .catch(err => {
                    connection.end();
                    return res.status(500).json({error : "erreur hash mdp", err});
                })
                
            }
        }) 
    });
})



module.exports = router; // on renvoie l'url 