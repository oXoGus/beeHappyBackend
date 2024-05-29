const express = require("express")
const mysql = require("mysql")
const port = process.env.PORT || 5000 // met le port a 5000 si il ne trouve pas de variable globale sur la machine 



const app = express() // on intancie l'app 


// Middleware qui permat de traiter les données de la requete du client
app.use(express.json())
app.use(express.urlencoded({ extended : false})) // permet de lire des requetes en urlencoded pour postaman


// get c'est pour réceptionnée le requete de l'utilisateur et lui renvoyer des données

app.get("/", (req, res) => { // on envoie a le la page a la base de notre sereur avec "/" : Hello, world! req : ce que le serv recoit / res : ce que le serv envoie 
    
    res.json({"message" : "Hello world!"})
})

const decodeToken = require("./get.routes/decodeToken")
app.use("/decodetoken", decodeToken)

const login = require("./post.routes/login")
app.use("/login", login)

const register = require("./post.routes/register")
app.use("/register", register)

const getCoords = require("./get.routes/coords") 
app.use("/get/coords", getCoords)// quand on est sur url/user on utilise le code de ./routes/user

const getWeight = require("./get.routes/weight") 
app.use("/get/weight", getWeight)// quand on est sur url/user on utilise le code de ./routes/user

const getBattery = require("./get.routes/battery") 
app.use("/get/battery", getBattery)// quand on est sur url/user on utilise le code de ./routes/user


app.listen(port, () => {console.log("le serveur est en ligne !")}) // on demare le serveur sur le port et on envoie un message dans les log




