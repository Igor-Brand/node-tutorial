// server.js
const http = require('http'); // Módulo central para criar servidores HTTP [3]
const path = require('path'); // Módulo central para lidar com caminhos de arquivos [3]
const fsPromises = require('fs').promises; // Módulo central para operações de arquivo assíncronas [3, 30]

const logEvents = require('./logEvents'); // Importa o módulo de logging customizado [9]
const EventEmitter = require('events'); // Módulo central para eventos [7, 9]
class Emitter extends EventEmitter {}; // Cria uma classe que estende EventEmitter [9]
const myEmitter = new Emitter(); // Cria uma instância do emitter [9]
myEmitter.on('log', (msg, fileName) => logEvents(msg, fileName)); // Adiciona um listener para o evento 'log' [10, 23]

const PORT = process.env.PORT || 3500; // Define a porta do servidor, usando variável de ambiente ou 3500 como padrão [3]

// Função assíncrona para servir arquivos
const serveFile = async (filePath, contentType, response) => { // Recebe o caminho do arquivo, tipo de conteúdo e objeto response [19]
    try {
        // Determina a codificação: utf-8 para texto, nulo para binário (como imagens) [22]
        const encoding = contentType.includes('image') ? '' : 'utf8';
        // Lê o conteúdo do arquivo [19, 30]
        const rawData = await fsPromises.readFile(filePath, encoding);
        // Se for JSON, analisa e converte de volta para string (opcional, demonstra parse/stringify) [21]
        const data = contentType === 'application/json'
            ? JSON.parse(rawData)
            : rawData;

        // Define o status code da resposta (404 para página 404, 200 caso contrário) [22]
        const statusCode = filePath.includes('404.html') ? 404 : 200;

        // Escreve o cabeçalho da resposta [19, 21, 22]
        response.writeHead(statusCode, { 'Content-Type': contentType });
        // Envia o conteúdo da resposta
        // Converte de volta para string se for JSON antes de enviar [21]
        response.end(contentType === 'application/json' ? JSON.stringify(data) : data);

    } catch (err) {
        // Captura erros durante a leitura do arquivo
        console.error(err); // Loga o erro no console
        myEmitter.emit('log', `${err.name}\t${err.message}`, 'errorLog.txt'); // Emite um evento de log para o arquivo de erros [23]
        // Define status code 500 para erro interno do servidor [19]
        response.statusCode = 500;
        response.end(); // Encerra a resposta
    }
}

// Cria o servidor HTTP [13]
const server = http.createServer((req, res) => {
    // Loga a URL e o método da requisição [13]
    console.log(req.url, req.method);
    // Emite um evento de log para cada requisição [23]
    myEmitter.emit('log', `${req.url}\t${req.method}`, 'requestLog.txt');

    // Obtém a extensão do arquivo solicitado [15]
    const extension = path.extname(req.url);

    // Define o tipo de conteúdo (Content-Type) com base na extensão [15]
    let contentType;
    switch (extension) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        default:
            contentType = 'text/html'; // Padrão para HTML [15]
    }

    // Define o caminho do arquivo a ser servido [16, 17]
    let filePath;
    // Lógica complexa para determinar o caminho do arquivo com base na URL e tipo de conteúdo
    if (contentType === 'text/html' && req.url === '/') { // Se for HTML e URL raiz, serve index.html na views
        filePath = path.join(__dirname, 'views', 'index.html');
    } else if (contentType === 'text/html' && req.url.slice(-1) === '/') { // Se for HTML e URL termina com /, serve index.html dentro do subdiretório
         filePath = path.join(__dirname, 'views', req.url, 'index.html');
    } else if (contentType === 'text/html') { // Se for HTML e não for os casos acima, serve o arquivo HTML na views
        filePath = path.join(__dirname, 'views', req.url);
    } else { // Para outros tipos de conteúdo (CSS, imagem, JSON, etc.), usa a URL diretamente a partir do diretório base
        filePath = path.join(__dirname, req.url);
    }

    // Torna a extensão .html opcional na URL para arquivos HTML [17]
    if (!extension && req.url.slice(-1) !== '/') {
        filePath = path.join(__dirname, 'views', req.url + '.html');
    }

    // Verifica se o arquivo existe [17]
    const fileExists = fsPromises.existsSync(filePath); // existsSync é síncrono [31]

    if (fileExists) {
        // Se o arquivo existe, serve o arquivo [17]
        serveFile(filePath, contentType, res);
    } else {
        // Se o arquivo não existe, lida com 404 ou redirecionamento [17]
        switch (path.parse(filePath).base) { // Usa o nome base do arquivo para checar redirects [18]
            case 'old-page.html': // Exemplo de redirecionamento
                res.writeHead(301, { 'Location': '/new-page.html' }); // Status 301 e cabeçalho Location [18]
                res.end(); // Encerra a resposta
                break;
            case 'www-page.html': // Outro exemplo de redirecionamento
                 res.writeHead(301, { 'Location': '/' }); // Redireciona para a raiz [18]
                 res.end(); // Encerra a resposta
                 break;
            default:
                // Se não for um redirect conhecido, serve a página 404 [18]
                serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
        }
    }
});

// Configura o servidor para escutar na porta especificada [13]
server.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Loga que o servidor iniciou [13]

