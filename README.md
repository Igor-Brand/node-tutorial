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
