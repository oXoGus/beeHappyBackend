const dotenv = require("dotenv")
const mysql = require("mysql2")
const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const router = express.Router() // on cherche l'url sur laquelle on est pour traitée les data

dotenv.config()



router.post("/", (req, res) => {
    // on recup les données de la requette
    const  { email, password } = req.body;

    // verification si on recoit bien un email et un password
    if(!email && !password){
        return res.status(400).json({message: 'entrer un email et un passord'})
    }else if (!email){
        return res.status(401).json({message: 'entrer un email'})
    }else if(!password){
        return res.status(402).json({message: 'entrer un passord'})
    }

    const connection  = mysql.createConnection({
     host: process.env.MYSQL_HOST,
     user: process.env.MYSQL_USER,
     password: process.env.MYSQL_PASSWORD,
     socketPath: '/run/mysqld/mysqld.sock',
     database: process.env.MYSQL_DB,
     });

    // connection a la db 
    connection.connect((err) => {
        if(err){
            console.log("Erreur de connexion a la DB : " + err.stack)
            res.status(500).send("Erreur de connexion a la DB : " + err.stack);
            return;
        }
        
        // on cherche si l'utilisateur existe
        connection.query("SELECT * FROM rucheAdmin WHERE email = ?", [email], (err, rows) => {
            if(err) throw res.status(500).json({message: 'bad SQL request'});
            
            // verification si l'admin existe
            try {
                rows[0]['email'];
                console.log('try');
                // on recuper le mots de passe de la base de donnée
                hashedPassword = rows[0]['password'];

                // verification du mot de passe
                if (bcrypt.compareSync(password, hashedPassword)){
                    // le mdp est correct
                    
                    // génération du token de session  
                    const token = jwt.sign({
                        email : rows[0]['email'],
                    }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURATING })
                    connection.end()
                    return res.status(200).json({accessToken: token})
                }else {
                    connection.end()
                    return res.status(405).json({ message : 'mauvais mot de passe'})
                }
            } catch (error) {
                connection.end()
                return res.status(403).json({message: 'mauvais email !'});
            }
        })
    });
})



module.exports = router; // on renvoie l'url 
