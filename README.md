# node-tutorial
Repositório para armazenar um tutorial de node.js
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
