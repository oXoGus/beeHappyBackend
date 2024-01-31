const express = require("express")
const port = process.env.PORT || 5000 // met le port a 5000 si il ne trouve pas de variable globale sur la machine 


const app = express() // on intancie l'app 


// Middleware qui permat de traiter les données de la requete du client
app.use(express.json())
app.use(express.urlencoded({ extended : false})) // permet de lire des requetes en urlencoded pour postaman


// get c'est pour réceptionnée le requete de l'utilisateur et lui renvoyer des données

app.get("/", (req, res) => { // on envoie a le la page a la base de notre sereur avec "/" : Hello, world! req : ce que le serv recoit / res : ce que le serv envoie 
    res.json({"message" : "Hello, world!"})
})

const user = require("./post.routes/coords") 
app.use("/coords", user)// quand on est sur url/user on utilise le code de ./routes/user

const weight = require("./post.routes/weight") 
app.use("/weight", weight)// quand on est sur url/user on utilise le code de ./routes/user

const battery = require("./post.routes/battery") 
app.use("/battery", battery)// quand on est sur url/user on utilise le code de ./routes/user

app.listen(port, () => {console.log("le serveur est en ligne !")}) // on demare le serveur sur le port et on envoie un message dans les log




