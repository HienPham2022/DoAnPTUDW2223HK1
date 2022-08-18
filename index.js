const express = require('express');
const app =express();

// set public static folder
app.use(express.static(__dirname+'/public'));
// use view engine
var hbs = require('express-handlebars');
let helper = require('./controllers/helper');
app.engine('hbs',hbs.engine({
    extname:'hbs',
    defaultLayout:'layout',
    layoutDir:__dirname + '/views/layouts',
    partialDir:__dirname + '/views/partials',
    helpers:{
        createStarList: helper.createStarList,
        createStars: helper.createStars
    },
    runtimeOptions: { allowProtoPropertiesByDefault: true },
}));
app.set('view engine','hbs');

// define your route here
app.use('/',require('./routes/indexRouter'));
app.use('/products',require('./routes/productRouter'));

app.get('/sync',(req,res)=>{
    let models = require('./models');
    models.sequelize.sync()
    .then(()=>{
        res.send('Database completed successfully!');
    });
});
app.get('/:page',(req,res)=>{
    let banners = {
        blog:'Our Blog',
        cart:'Shopping Cart',
        category: 'Shop Category',
        checkout: 'Product Checkout',
        confirmation: 'Order Confirmation',
        contact:'Contact Us',
        login:'Login / Register',
        register: 'Register',
        'single-blog': 'Blog Details',
        'single-product':'Shop Single',
        'tracking-order':'Order Tracking',
    };
    let page = req.params.page;    
    res.render(page,{ banner : banners[page]});
});


// set server port and start server
app.set('port',process.env.PORT|| 5000);
app.listen(app.get('port'),()=>{
    console.log('Server is listening on port: '+app.get('port'));
});