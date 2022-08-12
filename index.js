const express = require('express');
const app =express();

// set public static folder
app.use(express.static(__dirname+'/public'));
// use view engine
var hbs = require('express-handlebars');
app.engine('hbs',hbs.engine({
    extname:'hbs',
    defaultLayout:'layout',
    layoutDir:__dirname + '/views/layouts',
    partialDir:__dirname + '/views/partials'
}));
app.set('view engine','hbs');

// define your route here
app.get('/',(req,res)=>{
    res.render('index');
});
app.get('/blog',(req,res)=>{
    res.render('blog');
});

// set server port and start server
app.set('port',process.env.PORT|| 5000);
app.listen(app.get('port'),()=>{
    console.log('Server is listening on port: '+app.get('port'));
});