const express = require('express');
const app = express();



const logHoraMiddleware = (req, res, next) => {
  const horaAtual = new Date().toISOString();
  console.log(
    `[${horaAtual}] Nova solicitação recebida para: ${req.method} ${req.originalUrl}`
    );
  next();
};


app.get("/", logHoraMiddleware, function(req, res){
  res.send("Bem vindo a minha api")
})


app.get('/sobre', logHoraMiddleware, (req, res) => {
  res.send("Em breve nosso aplicativo estará no ar. Não perca!");
});


app.listen(3000, function(){
  console.log("Servidor Rodando!!")
})
