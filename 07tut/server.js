const express= require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const {logger} = require('./middleware/logEvents');
const errorHandler= require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;

//custom middleware logger
app.use(logger);

//Cross Origin Resource Sharing
const whitelist =['https://www.google.com','http://123.0.0.1:5500','http://localhost:3500'];
const corsOptions= {
    origin: (origin,callback)=>{
        if(whitelist.indexOf(origin)!== -1 || !origin){
            callback(null,true);
        }else{
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

//built-in middleware to handle urlencoded data
//in other words, form-data:
//'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false}));

//built-in middleware json
app.use(express.json());

//serve static files
app.use(express.static(path.join(__dirname,'public')));

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
    res.redirect(301,'/new-page');// 302 por padrão
});
// Regex para qualquer outro caminho (404)
app.get(/^\/(.+)/, (req, res) => {
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }else if(req.accepts('json')){
        res.json({error: "404 Not Found"});
    }else{
        res.type('txt').send("404 not found");
    }
  });

app.use(errorHandler);
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))





