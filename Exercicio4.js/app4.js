const express = require("express")

const app = express()

app.get("/", function(req, res){
  res.send("Bem vindo a minha api")
})

app.get("/produto/:id", function(req, res){
  const id = req.params.id
  if(id < 10) {
      res.send(`Ola tudo bem? Sua id e a ${id} Obrigado`)
  }
    else
      res.send(`Ola tudo bem? Sua id não foi encontrada: Sua id = ${id} Obrigado`)
  })

app.listen(3000, function(){
  console.log("Servidor Rodando!!")
})




