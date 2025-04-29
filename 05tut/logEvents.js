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
