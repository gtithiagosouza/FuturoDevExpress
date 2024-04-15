const express = require('express');
const yup = require('yup');
const app = express();
const PORT = 3000;

// Adiciona um middleware para trabalhar com json nas reqs.

app.use(express.json());

app.get('/', (req, res) => {
  res.json("Sucesso!");
});

// Lista de pessoas (simulando um "banco de dados" em memória)
let produtos = [];

//  Usando Middleware para logar as informações
const logHoraMiddleware = (req, res, next) => {
  const horaAtual = new Date().toISOString();
  console.log(
      `[${horaAtual}] Nova solicitação recebida para: ${req.method} ${req.originalUrl}`
  );
  next(); 
};

app.use(logHoraMiddleware);

// listando todo produtos
app.get('/produtos', (req, res) => { 
  res.json(produtos);
});

// Adicionando um novo produto
const schema = yup.object().shape({
  nome: yup.string().required(),
  preco: yup.number().required().positive(),
  descricao: yup.string().required(),
});

app.post('/produtos', async (req, res) => {
  try {
    const produto = req.body.produto; 

    await schema.validate(produto);

    produto.id = produtos.length > 0 ? produtos[produtos.length - 1].id + 1 : 1;
    produtos.push(produto);
    
    res.status(201).send('Produto adicionado com sucesso.');
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).send(error.errors.join('. '));
    }
    return res.status(500).send('Erro interno do servidor.');
  }
});
 
// Rota para atualizar um Produto por ID
app.put('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const newData = req.body.produto;
  const index = produtos.findIndex(produto => produto.id === parseInt(id));
  if (index === -1) {
      res.status(404).send('Produto não encontrado.');
  } 
  
  produtos[index] = { ...produtos[index], ...newData };
  res.status(200).send('Produto atualizado com sucesso.');
});

// Rota para deletar um produto por ID
app.delete('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const index = produtos.findIndex(produto => produto.id === parseInt(id));
  if (index === -1) {
      res.status(404).send('Produto não encontrado.');
      return;
  }
  produtos.splice(index, 1);
  res.status(200).send('Produto deletado com sucesso.');
});


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
})