const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log',log+'\n');
    next();
});

app.use((req,res,next)=>{
    res.render('maintainence.hbs');
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('changeIt',(text)=>{
   return text.toUpperCase();
})

//set handler
app.get('/', (req, res)=>{
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMsg: 'Welcome to a page served from NODEJS express server'
    });
});

app.get('/about', (req,res)=>{
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
})

//bind to port
app.listen(3000, () =>{
    console.log('Server is up on port 3000');
} );