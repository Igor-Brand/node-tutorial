const express= require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;

app.get('/',(req,res)=>{
    // res.sendFile('./views/index.html',{root: __dirname});
    res.sendFile(path.join(__dirname,'views','index.html'));
});

app.get('/new-page',(req,res)=>{
    // res.sendFile('./views/index.html',{root: __dirname});
    res.sendFile(path.join(__dirname,'views','new-page.html'));
});

app.get('/old-page',(req,res)=>{
    // res.sendFile('./views/index.html',{root: __dirname});
    res.redirect(301,'/new-page.html');// 302 por padrão
});
// Regex para qualquer outro caminho (404)
app.get(/^\/(.+)/, (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
  });
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))





