const express = require("express")

const app = express()

app.get("/", function(req, res){
  res.send("Bem vindo a minha api")
})

app.listen(3000, function(){
  console.log("Servidor Rodando!!")
})

