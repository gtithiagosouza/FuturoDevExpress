const express = require("express")

const app = express()

app.get("/sobre", function(req, res){
  res.send("Em breve nosso aplicativo estará no ar. Não perca!")
})


app.get("/contato", function(req, res){
  res.send("Para mais informações entre em contato conosco nossoemail@teuemail.com.br")
})

app.listen(3000, function(){
  console.log("Servidor Rodando!!")
})

