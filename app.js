const express = require('express')

const session = require('express-session');

const bodyParser = require('body-parser');

const port = 3000

var path = require('path');

const app = express()

const login = {
    user: "admin",
    password: '12345'
};

app.use(session({secret:'01210321919j9n9unb19u'}))

app.engine('html', require('ejs').renderFile);

app.use(bodyParser.urlencoded({extended:true}))

app.set('view engine','html');

app.use('public', express.static(path.join(__dirname, 'public')))

app.set('views', path.join(__dirname, '/views'))

app.get('/login', (req, res)=> {
    if(req.session.login) {
        res.render('logado')
        console.log(`User On in Time: ${req.session.login}`)
    }
    else {
        res.render('index');
    }
})

app.post('/login', (req, res)=> {
    
    if(req.body.login == login.user && req.body.password == login.password) {
        req.session.login = login;
        res.render('logado')
    } else {
        res.render('index')
    }

    
    
})

app.listen(port || 3000, ()=>{
    console.log(`Server Running in localhost:${port}`);
})