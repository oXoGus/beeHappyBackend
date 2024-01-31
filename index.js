const express = require("express")
const port = process.env.PORT || 5000 // met le port a 5000 si il ne trouve pas de variable globale sur la machine 


const app = express() // on intancie l'app ?

// get c'est pour réceptionnée le requete de l'utilisateur et lui renvoyer des données

app.get("/", (req, res) => { // on envoie a le la page a la base de notre sereur avec "/" : Hello, world! req : ce que le serv recoit / res : ce que le serv envoie 
    res.json({"message" : "Hello, world!"})
})

const user = require("./routes/user") 
app.use("/user", user)// quand on est sur url/user on utilise le code de ./routes/user

app.listen(port, () => {console.log("le serveur est en ligne !")}) // on demare le serveur sur le port et on envoie un message dans les log




