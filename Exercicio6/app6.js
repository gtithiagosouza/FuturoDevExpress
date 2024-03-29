const express = require('express');
const app = express();

let pessoas = [];

app.use(express.json());

// Criação (Create):
// Rota para adicionar uma nova pessoa
app.post('/users', (req, res) => {
  const pessoa = req.body;
  pessoa.id = pessoas.length > 0 ? pessoas[pessoas.length - 1].id + 1 : 1;
  pessoas.push(pessoa);
  res.status(201).send('Pessoa adicionada com sucesso.');
});

//Leitura (Read):
// Rota para obter todas as pessoas
app.get('/users', (req, res) => { 
  res.json(pessoas);
});

//Leitura (Read):
// Rota para obter uma pessoa por ID
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const pessoa = pessoas.find(pessoa => pessoa.id === parseInt(id));
  if (!pessoa) {
      res.status(404).send('Pessoa não encontrada.');
      return;
  }
  res.json(pessoa);
});

//Atualização (Update):
// Rota para atualizar uma pessoa por ID
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  const index = pessoas.findIndex(pessoa => pessoa.id === parseInt(id));
  if (index === -1) {
      res.status(404).send('Pessoa não encontrada.');
      return;
  }
  pessoas[index] = { ...pessoas[index], ...newData };
  res.status(200).send('Pessoa atualizada com sucesso.');
});


// Rota para deletar uma pessoa por ID
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const index = pessoas.findIndex(pessoa => pessoa.id === parseInt(id));
  if (index === -1) {
      res.status(404).send('Pessoa não encontrada.');
      return;
  }
  pessoas.splice(index, 1);
  res.status(200).send('Pessoa deletada com sucesso.');
});


app.listen(3000, function(){
  console.log("Servidor Rodando!!")
})