const http = require("http");
const Api = require('./api/api').default;
const PORT = 5000;
const server = http.createServer(Api);

server.listen(PORT);

server.on('listening', () => {
	console.log(`Servidor está rodando na porta ${PORT}`)
});

server.on('error', error => {
	console.log(`Ocorreu um erro: ${error}`)
});
