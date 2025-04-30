# node-tutorial
Repositório para armazenar um tutorial de node.js

# Aula 1
## 1. **The Global Object**

No **Node.js**, o objeto global é chamado `global` (parecido com o `window` no navegador). Ele contém variáveis e funções acessíveis de qualquer lugar.

### Exemplo:

```js

console.log(global); // Mostra várias funções e objetos globais  global.myVar = 'Igor'; 
console.log(myVar); // Igor

```
> ⚠️ Dica: Evite usar o `global` pra guardar variáveis. Prefira `const` ou `let`.

---

## 2. **CommonJS Imports (require)**

Node.js usa o sistema **CommonJS** para importar/exportar módulos.

### Importando com `require`:

```js

const fs = require('fs'); // Importa módulo nativo de arquivos
```

### Exportando:

**math.js:**

```js

const add = (a, b) => a + b;
module.exports = { add };
```

**server.js:**

```js

const math = require('./math'); 
console.log(math.add(2, 3)); // 5`
```

---

## 3. **OS Core Module (`os`)**

O módulo `os` fornece info do **sistema operacional**. É nativo, não precisa instalar.

### Exemplo:

```js

const os = require('os');  
console.log(os.platform()); // linux, darwin (mac), win32 
console.log(os.homedir());  // Mostra a pasta do usuário 
console.log(os.cpus());     // Info dos núcleos do processador
```

---

## 4. **Path Core Module (`path`)**

Serve para **manipular caminhos de arquivos** de forma segura e multiplataforma.

### Exemplo:

```js

const path = require('path');  console.log(__filename); // Caminho completo do arquivo atual 
console.log(path.basename(__filename)); // Nome do arquivo (ex: server.js) 
console.log(path.dirname(__filename));  // Pasta onde o arquivo está
console.log(path.join(__dirname, 'folder', 'file.txt')); // Caminho final montado
```

---

## 5. **Custom Modules e Export/Import**

Você pode criar seus próprios módulos para organizar melhor seu código.

### 📦 `math.js`

```js

const add = (a, b) => a + b; 
const sub = (a, b) => a - b;  
module.exports = { add, sub };
```

### 📄 `server.js`

```js

const math = require('./math');  
console.log(math.add(10, 5)); // 15 
console.log(math.sub(10, 5)); // 5
```

> 🔁 Você pode exportar uma função única ou um objeto com várias funções.

---

## Resumo rápido:

|Tópico|O que faz|Exemplo principal|
|---|---|---|
|`global`|Variáveis globais (como `window` no browser)|`global.myVar = 'ok'`|
|CommonJS `require`|Importa módulos (core, externos, personalizados)|`const fs = require('fs')`|
|`os`|Info sobre o sistema operacional|`os.platform()`|
|`path`|Manipula caminhos de arquivos|`path.join(__dirname, 'file.txt')`|
|Custom modules|Você cria e importa seus próprios módulos|`require('./math')`|

# Aula 2
### ✅ **1. Como ler um arquivo com Node.js**

No seu `server.js`:

```js

const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8'); 
console.log(data);

```
👉 Lê o conteúdo do arquivo `starter.txt` de forma assíncrona com `fsPromises.readFile`.

---

### ✅ **2. Como tratar erros inesperados**

No final do seu `server.js`:

```js

process.on('uncaughtException', err => {     console.log(`Existe um erro inesperado: ${err}`);     
	process.exit(1); 
});
```

👉 Captura qualquer erro **não tratado** que possa travar sua aplicação, evitando o crash sem aviso.

---

### ✅ **3. Exemplo assíncrono (Async example)**

Na função `fileOps()`:

```js

const fileOps = async () => {     
	try {         // await operações     
	} catch (err) {         
	console.log(err);     
	} 
}
```

👉 Exemplo completo de função `async` que executa várias tarefas com `await`.

---

### ✅ **4. Módulo `path`**

```js

const path = require('path'); 
path.join(__dirname, 'files', 'starter.txt');
```

👉 Usado para construir caminhos de arquivos de forma **segura** e **multiplataforma** (Linux/Windows/Mac).

---

### ✅ **5. Como escrever em um arquivo**

```js

await fsPromises.writeFile(path.join(__dirname, 'files', 'promiseWrite.txt'), data);
```

👉 Cria (ou sobrescreve) um arquivo com o conteúdo lido de `starter.txt`.

---

### ✅ **6. Como atualizar um arquivo**

```js


await fsPromises.appendFile(path.join(__dirname, 'files', 'promiseWrite.txt'), '\n\nNice to meet you');
```

👉 Adiciona novas informações ao final do arquivo, sem apagar o conteúdo anterior.

---

### ✅ **7. Operações aninhadas (Nested operations)**

Você tinha isso comentado:

```js

fs.writeFile(..., () => {   
	fs.appendFile(..., () => {     
		fs.rename(..., () => {       
		// operações dentro de outras     
		});   
	}); 
});
```

👉 Chamadas dentro de chamadas = código difícil de ler e manter.

---

### ✅ **8. Callback Hell**

Mesmo exemplo acima: múltiplas funções com callbacks aninhados geram a famosa “**pirâmide da desgraça**”.

---

### ✅ **9. `fsPromises`**

```js
const fsPromises = require('fs').promises;
```

👉 Permite usar **promises** com o módulo `fs`, ou seja, usar `await` em vez de callbacks.

---

### ✅ **10. Substituir Callback Hell com Async/Await**

Você fez isso com:

```js

await fsPromises.writeFile(...); 
await fsPromises.appendFile(...); 
await fsPromises.rename(...);
```

👉 Código **limpo, sequencial e mais fácil de entender**.

---

### ✅ **11. Como deletar um arquivo**

```js

await fsPromises.unlink(path.join(__dirname, 'files', 'starter.txt'));
```

👉 Deleta o arquivo `starter.txt` depois de lê-lo.

---

### ✅ **12. ReadStream para arquivos grandes**

No `stream.js`:

```js

const rs = fs.createReadStream('./files/lorem.txt', { encoding: 'utf8' });
```

👉 Lê **em partes**, sem carregar o arquivo inteiro na memória (ótimo para arquivos grandes).

---

### ✅ **13. WriteStream para arquivos grandes**

```js

const ws = fs.createWriteStream('./files/new-lorem.txt');
```

👉 Vai escrevendo os pedaços lidos pelo `ReadStream` em tempo real.

---

### ✅ **14. Listener de dados com stream**

Comentado no seu código:

```js

rs.on('data', (dataChunk) => {     
	ws.write(dataChunk); 
});
```

👉 Cada pedaço de dados lido é enviado diretamente para o arquivo de saída.

---

### ✅ **15. Pipe de dados (Piping)**

Você usou:

`rs.pipe(ws);`

👉 É o jeito **mais simples e eficiente** de transferir dados de leitura para escrita (como um "caninho").

---

### ✅ **16. Como criar um diretório**

No `dir.js`:

```js

fs.mkdir('./new', (err) => {     
	if (err) throw err;     
	console.log("Diretório criado"); 
});

```
👉 Cria um novo diretório chamado `new`, se ele não existir.

---

### ✅ **17. Como verificar se um arquivo ou diretório existe**


`if (!fs.existsSync('./new')) {     // cria diretório }`

👉 Verifica se um diretório existe **antes de criar ou remover**.

---

### ✅ **18. Como remover um diretório**


`fs.rmdir('./new', (err) => {     if (err) throw err;     console.log("Diretório removido"); });`

👉 Remove um diretório, desde que esteja vazio.

# Aula 3
### ✅ **1. O que é o NPM?**

**NPM (Node Package Manager)** é o gerenciador de pacotes do Node.js. Ele te permite:

- Instalar bibliotecas prontas de terceiros (ex: `express`, `lodash`, etc)
    
- Gerenciar dependências de um projeto
    
- Rodar scripts úteis (como `npm start`, `npm test`, etc)

### ✅ **2. Objetivo do tutorial (Goals for tutorial)**

- Aprender a usar NPM no seu projeto Node.js
    
- Instalar e remover pacotes
    
- Entender o `package.json`
    
- Criar scripts e diferenciar dependências de produção e de desenvolvimento
    

---

### ✅ **3. Como encontrar a documentação do NPM**

- Site oficial: [https://docs.npmjs.com](https://docs.npmjs.com)
    
- Para qualquer comando, use:


`npm help <comando> # Exemplo: npm help install`

---

### ✅ **4. Como instalar um pacote NPM globalmente**

Global = disponível **em todo o sistema**, não só no seu projeto.

`npm install -g nodemon`

👉 Agora você pode rodar `nodemon` de qualquer lugar no terminal.

---

### ✅ **5. `npm init`**

Cria o arquivo `package.json`, que registra informações do seu projeto.

`npm init # ou mais rápido: npm init -y`

---

### ✅ **6. `package.json`**

É o **coração do projeto** Node. Armazena:

- Nome, versão, autor, etc
    
- Dependências (`dependencies`)
    
- Scripts (`scripts`)
    
- DevDependencies (`devDependencies`)
    

Exemplo:

```json

{
  "name": "meu-projeto",
  "version": "1.0.0",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
}

```

---

### ✅ **7. Como instalar uma dependência de produção**

`npm install express`

👉 Vai aparecer dentro de `"dependencies"` no `package.json`.

---

### ✅ **8. Node Modules**

Depois de instalar um pacote, ele vai pra **`node_modules/`**, que é onde ficam os arquivos de todas as dependências.

⚠️ **Não edite nada manualmente dentro da pasta `node_modules`.**

---

### ✅ **9. Como usar um pacote no seu app**

Depois de instalar, você pode importar assim:

`const express = require('express');`

Ou, se for módulo ES:

`import express from 'express';`

---

### ✅ **10. Como instalar uma dependência de desenvolvimento**

`npm install -D nodemon # ou npm install --save-dev nodemon`

👉 Aparece na chave `"devDependencies"`.

---

### ✅ **11. Scripts do NPM**

Dentro do `package.json`, você pode criar **atalhos** para comandos:


```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}

```

E rodar com:

`npm run dev`

---

### ✅ **12. Adicionar outra dependência de produção**

Simplesmente:

`npm install axios`

👉 Agora `axios` aparece nas `"dependencies"`.

---

### ✅ **13. Importar um pacote com um alias**

Você pode usar alias manualmente:

`const http = require('axios'); // embora axios seja nome da lib, o alias aqui é "http"`

Mas em geral, isso é feito com variáveis. O nome usado após `require()` ou `import` é seu alias.

---

### ✅ **14. Buscar pacotes no NPM**

Use o site: 🔎 [https://www.npmjs.com](https://www.npmjs.com)

Ou no terminal:

`npm search <nome>`

---

### ✅ **15. Versionamento Semântico (Semantic Versioning)**

No `package.json`, as versões seguem a estrutura:

`"express": "^4.18.2"`

📌 `MAJOR.MINOR.PATCH`

- **MAJOR** (4): mudanças quebram compatibilidade
    
- **MINOR** (18): novas funcionalidades sem quebrar
    
- **PATCH** (2): correções de bugs
    

Símbolos:

- `^` → atualiza `MINOR` e `PATCH`
    
- `~` → atualiza apenas `PATCH`
    

---

### ✅ **16. Como atualizar dependências**

`npm update`

Ou para um pacote específico:

`npm install express@latest`

---

### ✅ **17. Como desinstalar um pacote**

`npm uninstall axios`

👉 Remove do `package.json` e da pasta `node_modules`.

# aula 04

# 📘 Tutorial Completo: Criando um Módulo de Log Personalizado com Eventos em Node.js

## 🎯 Objetivo

Você vai aprender a:

- Criar um sistema de log que grava mensagens com data e um ID único.
    
- Usar o módulo de eventos (`EventEmitter`) para emitir e reagir a eventos.
    
- Trabalhar com `fsPromises`, `async/await`, e pacotes NPM.

## 📁 Estrutura do Projeto

```lua
project/
│
├── logEvents.js       ← Módulo que grava os logs
├── index.js           ← Arquivo principal
└── logs/              ← Pasta onde os logs serão salvos

```

## 1️⃣ Criando o Módulo de Log

### 📄 Arquivo: `logEvents.js`

```javascript
// Importa a função format do pacote date-fns para formatar datas
const { format } = require('date-fns');

// Importa a função v4 e renomeia como 'uuid' para gerar IDs únicos
const { v4: uuid } = require('uuid');

// Importa o módulo de sistema de arquivos (fs) padrão do Node
const fs = require('fs');
const fsPromises = require('fs').promises; // Versão baseada em Promises

// Importa o módulo path para trabalhar com caminhos de arquivos
const path = require('path');

```
### 🧠 Função principal: `logEvents`

```js
const logEvents = async (message) => {
```
Declara uma função assíncrona que vai receber uma mensagem de log.

```js
  const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')};
```
Formata a data atual no estilo: 20250415 14:55:20, usando \t para separar com tabulações.

```js
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
```
Monta a string de log com data, ID único e a mensagem que foi passada.

### 📦 Criação da pasta `logs/` e escrita do log
```js
  try {
    if (!fs.existsSync(path.join(__dirname, 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, 'logs'));
    }

```
Verifica se a pasta `logs` existe. Se não existir, cria ela usando `fsPromises.mkdir`.

```js
    await fsPromises.appendFile(
      path.join(__dirname, 'logs', 'eventLog.txt'),
      logItem
    );
```
Adiciona (ou cria) o arquivo `eventLog.txt` dentro da pasta `logs`, e grava a linha de log nele.
```js
  } catch (err) {
    console.log(err);
  }
};
```
 Captura e exibe qualquer erro que possa ocorrer no processo de gravação.

### Exportando o módulo
```js
module.exports = logEvents;
```
Torna a função `logEvents()` disponível para ser usada em outros arquivos.

## 2️⃣ Criando e Usando um Emissor de Eventos

### 📄 Arquivo: `index.js`

```js
const logEvents = require('./logEvents');
```
Importa a função de log criada anteriormente.

```js
const EventEmitter = require('events');
```
Importa o módulo events do Node.js, que permite criar e ouvir eventos.

```js
class MyEmitter extends EventEmitter {};
```
Cria uma classe MyEmitter que herda da classe EventEmitter.

```js
const myEmitter = new MyEmitter();
```
Cria uma instância do emissor de eventos. Agora podemos usar .on() e .emit().

```js
myEmitter.on('log', (msg) => logEvents(msg));
```
Define o que deve acontecer quando o evento 'log' for emitido: chamar logEvents(msg).

```js
setTimeout(() => {
  myEmitter.emit('log', 'Log event emitted!');
}, 2000);
```
Aguarda 2 segundos e emite o evento 'log', passando a mensagem "Log event emitted!".

# Aula 05


--------------------------------------------------------------------------------

1. Estrutura do Projeto

Você precisará de uma estrutura de pastas para organizar seus arquivos, incluindo os arquivos que o servidor irá servir.

```
/seu-projeto
├── node_modules/       (criada pelo npm)
├── logs/               (para logs de requisição e erro) [1, 8, 11]
├── data/               (para arquivos de dados, como JSON, TXT) [1]
├── images/             (para arquivos de imagem) [1]
├── views/              (para arquivos HTML) [1]
│   ├── subdir/         (um subdiretório de exemplo) [3]
│   │   └── index.html
│   ├── 404.html        (página de erro 404) [1]
│   ├── index.html      (página inicial) [1]
│   └── new-page.html   (outra página de exemplo) [1]
├── .gitignore          (para ignorar a pasta node_modules) [26]
├── package.json        (gerenciado pelo npm) [1, 4]
├── logEvents.js        (módulo customizado para logging) [7]
└── server.js           (arquivo principal do servidor) [1]
```

Crie as pastas logs, data, images, views e views/subdir manualmente. Crie os arquivos package.json, logEvents.js, server.js, .gitignore, e os arquivos de exemplo dentro das pastas (index.html, 404.html, new-page.html, etc.

2. Configuração Inicial e Dependências ()

O arquivo package.json gerencia as informações do projeto, scripts e dependências. Você pode criá-lo usando npm init -y para aceitar os padrões.

Precisamos instalar algumas dependências:

• date-fns: Para formatar datas em logs.

• uuid: Para gerar IDs únicos em logs.

• nodemon: Uma dependência de desenvolvimento para reiniciar o servidor automaticamente ao detectar mudanças nos arquivos.

No terminal, dentro da pasta do projeto:

```
npm init -y
npm install date-fns uuid # Instala dependências de produção
npm install nodemon -D # Instala nodemon como dependência de desenvolvimento
```

Seu package.json deve se parecer com algo assim (os números de versão podem variar):

```
{
  "name": "seu-projeto", // Pode mudar [1]
  "version": "1.0.0",
  "description": "",
  "main": "server.js", // Ponto de entrada principal [1]
  "scripts": {
    "start": "node server", // Script para rodar em produção [5]
    "dev": "nodemon server" // Script para desenvolvimento [5]
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "date-fns": "^2.x.x", // Versão de date-fns [4, 5]
    "uuid": "^8.x.x"     // Versão de uuid [6]
  },
  "devDependencies": {
    "nodemon": "^2.x.x" // Versão de nodemon [5]
  }
}
```

Adicione node_modules/ ao seu arquivo .gitignore para não incluir a pasta no Git.

```
node_modules/
```

3. Módulo de Logging ()

Este módulo será responsável por formatar e escrever entradas de log em um arquivo, além de garantir que o diretório de logs exista.

```
// logEvents.js
const { format } = require('date-fns'); // Importa format de date-fns [7]
const { v4: uuid } = require('uuid'); // Importa v4 de uuid como uuid [7]

const fs = require('fs'); // Importa o módulo fs (síncrono para existsSync) [8, 11]
const fsPromises = require('fs').promises; // Importa a versão com Promises do fs [8]
const path = require('path'); // Importa o módulo path [8]

// Função assíncrona para logar eventos
const logEvents = async (message, logName) => { // Aceita a mensagem e o nome do arquivo de log [23]
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`; // Formata data e hora [8]
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`; // Formata a linha de log com data, ID e mensagem [8, 11]

    try {
        // Verifica se o diretório de logs existe, se não, cria [11]
        if (!fs.existsSync(path.join(__dirname, 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, 'logs'));
        }
        // Adiciona a entrada de log ao arquivo especificado [8]
        await fsPromises.appendFile(path.join(__dirname, 'logs', logName), logItem);
    } catch (err) {
        console.error(err); // Loga o erro no console se não conseguir escrever no arquivo [8]
    }
}

module.exports = logEvents; // Exporta a função logEvents [9]
```

Explicação do logEvents.js:

•Importa format da biblioteca date-fns para obter a data e hora formatadas.

•Importa v4 (uma função para gerar UUIDs versão 4) da biblioteca uuid e a renomeia para uuid localmente.

•Importa os módulos fs (File System) e path, ambos módulos centrais do Node.js8.... A versão com Promises do fs (fsPromises) é usada para operações assíncronas com await8. A versão síncrona fs.existsSync é usada para verificar a existência do diretório11.

•Define uma função assíncrona logEvents que recebe message (a mensagem do log) e logName (o nome do arquivo de log).

•Dentro da função, a data e hora atuais são formatadas.

• Uma string logItem é criada contendo a data/hora, um UUID único, a mensagem, e uma quebra de linha (\n) para garantir que cada log fique em uma linha separada.A string usa tabulações (\t) para separar os campos, criando um arquivo de log delimitado por tabuladores.

•Um bloco try...catch é usado para lidar com erros durante as operações de arquivo.

• Dentro do try, fs.existsSync verifica se o diretório logs existe no mesmo nível que o arquivo atual (__dirname representa o diretório do arquivo em execução).

• Se o diretório logs não existir, fsPromises.mkdir o cria11.

• fsPromises.appendFile é usado para adicionar a string logItem ao final do arquivo especificado por logName dentro do diretório logs. Se o arquivo não existir, ele será criado8.

• Erros são capturados no bloco catch e logados no console8.

• A função logEvents é exportada usando module.exports para que possa ser importada em outros arquivos, como o server.js.

4. Arquivo Principal do Servidor ()

Este é o arquivo onde o servidor HTTP é criado e a lógica para lidar com as requisições é implementada.

```
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

// Captura exceções não tratadas para evitar que o processo Node.js pare [33]
process.on('uncaughtException', err => {
    console.error(`There was an uncaught error: ${err.message}`); // Loga o erro no console
    myEmitter.emit('log', `${err.name}\t${err.message}`, 'errorLog.txt'); // Emite um evento de log para o arquivo de erros [23]
    process.exit(1); // Encerra o processo com código de erro [33]
});

```

Explicação Detalhada do server.js:

1. Importações:

◦Importa os módulos centrais http, path e fs.promises3.

◦ Importa o módulo customizado logEvents que criamos.

◦ Importa o módulo events e configura um EventEmitter (myEmitter). Um listener é adicionado para o evento log, que chamará a função logEvents passando a mensagem e o nome do arquivo de log.

2. Porta:

◦ Define a porta do servidor. Ele tenta usar a variável de ambiente process.env.PORT (útil para hospedagem) e, se não estiver definida, usa 3500 como padrão para desenvolvimento local.

3. Função serveFile:

◦ Esta é uma função assíncrona reutilizável que lida com a leitura e envio de arquivos.

◦ Usa try...catch para capturar erros de leitura de arquivo.

◦ Determina a codificação para a leitura do arquivo: utf8 para arquivos de texto (HTML, CSS, JS, JSON, TXT) e uma string vazia para binários como imagens, para não corrompê-los.

◦ fsPromises.readFile lê o conteúdo do arquivo assincronamente.

◦ Um tratamento opcional para JSON é mostrado: JSON.parse após a leitura e JSON.stringify antes de enviar, embora simplesmente enviar o rawData já funcione.

◦ Define o statusCode da resposta: 404 se o arquivo lido for 404.html, caso contrário 20022.

◦ response.writeHead escreve os cabeçalhos da resposta, incluindo o status code e o Content-Type.

◦ response.end envia o corpo da resposta e finaliza a comunicação com o cliente.

◦ No catch, erros são logados no console e um evento log é emitido para ser salvo no arquivo errorLog.txt.... A resposta é encerrada com status code 50019.

4. Criação do Servidor:

◦ http.createServer() cria o servidor e recebe um callback que será executado para cada requisição. O callback recebe os objetos req (requisição) e res (resposta).

◦ A URL (req.url) e o método HTTP (req.method) são logados no console e um evento log é emitido para o arquivo requestLog.txt.

◦ path.extname(req.url) obtém a extensão do arquivo da URL.

◦ Um switch é usado para determinar o contentType apropriado com base na extensão. text/html é o padrão.

◦ A variável filePath é definida usando lógica condicional (operadores ternários ou if/else if) combinada com path.join(__dirname, ...) para construir o caminho completo do arquivo no sistema de arquivos. Casos específicos como a URL raiz (/) e URLs de subdiretórios (/subdir/) são tratados para apontar para o index.html correto dentro da pasta views3.... Outros tipos de arquivo usam a URL diretamente a partir do diretório base do projeto. __dirname é uma variável global do Node.js que contém o caminho do diretório do arquivo em execução.

◦ Uma verificação adicional modifica filePath para adicionar .html se a URL não tiver extensão e não terminar com /, tornando a extensão .html opcional no navegador para arquivos HTML.

◦ fsPromises.existsSync(filePath) verifica se o arquivo calculado existe no sistema de arquivos17.... É usado aqui de forma síncrona para decidir o fluxo do código (servir arquivo existente vs. 404/redirect).

◦Se o arquivo existe: A função serveFile é chamada com o filePath, contentType e o objeto res17.

◦ Se o arquivo não existe: Um switch é usado no nome base do arquivo solicitado (path.parse(filePath).base) para verificar se é uma URL antiga que precisa ser redirecionada.

▪ Redirecionamento (Status 301): Se o nome base corresponder a uma URL antiga (ex: old-page.html, www-page.html), a resposta é enviada com status 301 e um cabeçalho Location indicando a nova URL18. res.end() finaliza a resposta.

▪ 404 (Página Não Encontrada): Se o nome base não corresponder a um redirect conhecido, a função serveFile é chamada para servir o arquivo 404.html da pasta views18. A função serveFile lida internamente com a definição do status 404 para este caso específico.

5. Listener e Erros Não Tratados:

◦ server.listen(PORT, ...) inicia o servidor e faz com que ele escute as requisições na porta definida. Um callback é executado quando o servidor começa a rodar, logando uma mensagem no console.

◦ process.on('uncaughtException', ...) configura um listener para capturar quaisquer exceções JavaScript que não tenham sido tratadas por blocos try...catch. Isso impede que o processo Node.js "cai" inesperadamente. O erro é logado e o processo é encerrado com um código de erro (1)33. Um evento de log também é emitido para o arquivo de erros.

--------------------------------------------------------------------------------

Para rodar este servidor:

1. Certifique-se de ter o Node.js instalado.

2. Crie a estrutura de pastas e arquivos conforme descrito. Adicione algum conteúdo de exemplo nos arquivos (index.html, 404.html, etc.).

3. Abra o terminal na pasta raiz do projeto.

4. Execute npm install para instalar as dependências listadas no package.json (isso criará a pasta node_modules/).

5. Execute npm run dev para iniciar o servidor usando nodemon5.

O servidor estará rodando em http://localhost:3500. O nodemon irá monitorar seus arquivos (server.js, logEvents.js, e os arquivos nas pastas views, data, images) e reiniciar o servidor se detectar mudanças.... Requisições serão logadas na pasta logs.

Este é um exemplo funcional de um servidor web básico em Node.js construído do zero1, demonstrando como lidar manualmente com requisições, roteamento simples, tipos de conteúdo e sistema de arquivos. Frameworks como o Express.js abstraem grande parte dessa complexidade, tornando o desenvolvimento mais rápido.

# Aula 06

# Introdução ao Express.js - Explicação do Código

Este documento fornece uma explicação detalhada do código de um servidor básico utilizando o framework Express.js com Node.js.

---

## Código do Servidor Express.js

```js
// Imports
const express = require('express');
const path = require('path');

// App definition
const app = express();

// Define port
const PORT = process.env.PORT || 3500;

// Define route handlers (used in the '/chain' route example)
const functionOne = (req, res, next) => {
    console.log('one');
    next();
};

const functionTwo = (req, res, next) => {
    console.log('two');
    next();
};

const functionThree = (req, res) => {
    console.log('three');
    res.send('finished');
};

// Routes

// Root route and index.html (with optional .html)
app.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// New page route (with optional .html)
app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

// Old page redirect (with optional .html)
app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page.html');
});

// Example of chained route handlers (anonymous functions)
app.get('/hello(.html)?', (req, res, next) => {
    console.log('attempted to load hello.html');
    next();
}, (req, res) => {
    res.send('Hello World');
});

// Example of chained route handlers (array of named functions)
app.get('/chain(.html)?', [functionOne, functionTwo, functionThree]);

// Catch-all route for 404
app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

---

## Explicação Linha a Linha

### 1. Importações
- `express`: importa o framework Express.js.
- `path`: módulo nativo do Node.js para lidar com caminhos de arquivos.

### 2. Instanciação da Aplicação
- `const app = express();`: cria uma instância da aplicação Express.

### 3. Definição da Porta
- `const PORT = process.env.PORT || 3500;`: define a porta do servidor.

### 4. Handlers para Rota `/chain`
- Funções que mostram como middleware funciona, encadeando ações com `next()`.

### 5. Rotas
- `/`, `/index.html`: envia `index.html`.
- `/new-page.html`: envia `new-page.html`.
- `/old-page.html`: redireciona para `/new-page.html`.
- `/hello.html`: usa múltiplos handlers em sequência.
- `/chain.html`: executa três funções sequenciais antes de responder.
- `/*`: envia `404.html` para qualquer rota não tratada.

### 6. Inicialização do Servidor
- `app.listen(...)`: inicia o servidor e escuta na porta definida.

