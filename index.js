/* const express = require("express")

const app = express()

app.get("/", function(req, res){
  res.send("Bem vindo a minha api")
})

app.get("/sobre", function(req, res){
  res.send("Essa e minha primeira aplicação de servidor")
})

app.get("/meunome", function(req, res){
  res.send("Pedro Antunes")
})

app.get("/ola", function(req, res){
  res.send("ola tudo bem?")
})

app.get("/ola/:nome/:idade", function(req, res){
const nome = req.params.nome
const idade = req.params.idade
  res.send(`Ola ${nome} tudo bem? Você tem ${idade} anos`)
})


app.listen(3000, function(){
  console.log("Servidor Rodando!!")
}) */


const express = require("express")

const app = express()

app.use(express.json())


app.get("/", function(req, res){
  res.sendFile(__dirname + "/public/index.html")
})

app.get("/sobre", function(req, res){
  res.send("Essa e minha primeira aplicação de servidor")
})

app.get("/meunome", function(req, res){
  res.send("Pedro Antunes")
})

app.get("/ola", function(req, res){
  res.send("ola tudo bem? Com vocÊs?")
})

app.get("/ola/:nome/:idade", function(req, res){
const nome = req.params.nome
const idade = req.params.idade
  res.send(`Ola ${nome} tudo bem? Você tem ${idade} anos`)
})

app.get("/busca", (req, res) => {
  const { parametro } = req.query

  if(!parametro) {
    return res.status (400).json({
      error: "Parametros da Query necessarios"
    })
  }

  res.json({ message: `Você pesquisou por: ${parametro}` })

})


app.get("/busca2", (req, res) => {
  // let parametro = req.query.parametro

  const { nome, idade, cpf } = req.query

  // Verificar se o parâmetro "parametro" está presente!
  if(!nome) {
      return res.status(400).json({
          error: "Nome não foi informado!"
      })
  }

  if(!cpf) {
      return res.status(400).json({
          error: "CPF não foi informado!"
      })
  }


  res.json({ message: `Você pesquisou por: nome: ${nome} idade: ${idade} cpf: ${cpf}`})
})


let pessoas = []

app.post("/pessoas", (req, res) => {
  const { nome, idade, ativo } = req.body

  let novaPessoa = {nome, idade, ativo}

  pessoas.push(novaPessoa)

  res.status(201).send(`Pessoa adicionada com sucesso: ${JSON.stringify(novaPessoa)}` );
 
})



app.listen(3000, function(){
  console.log("Servidor Rodando!!")
})