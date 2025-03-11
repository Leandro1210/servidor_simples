import { createServer } from 'node:http';

const server = createServer((req, res) => {
  console.log(`Recebendo requisição: Método = ${req.method}, URL = ${req.url}`);

  if (req.method === 'POST' && req.url === '/login') {
    let body = '';

    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      console.log('Dados recebidos:', body);  // Log dos dados recebidos
      const { login, senha } = JSON.parse(body);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ login, senha }));
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('Servidor está rodando na porta 3000');
});
