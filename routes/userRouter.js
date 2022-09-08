let express =require('express');
const { route } = require('./indexRouter');
let router = express.Router();
let userController =require('../controllers/userController');

router.get('/login',(req,res)=>{
    res.render('login');
});

router.get('/register',(req,res)=>{
    res.render('register');
});

route.post('/register',(req,res,next)=>{
    let user ={
        fullname: req.body.fullname,
        username: req.body.username,
        password: req.body.password
    }
    let confirmPassword = req.body.confirmPassword;
    let keepLoggedIn = (req.body.keepLoggedIn != undefined);

    if(user.password != confirmPassword){
        return res.render('register',{
            message: 'Confirm password does not match!'
        });
    }

    userController
        .getUserByEmail(user.username)
        .then(user =>{
            if(user == null){
                return res.render('register',{
                    message: `Email ${user.username} exists! Please choose another email address`,
                    type: 'alert-danger'
                });
            }
            return userController
                .createUser(user)
                .then(user =>{
                    if(keepLoggedIn){
                        req.session.user = user;
                        res.render('/');
                    }
                    else{
                        res.render('login',{
                            message:'You have registerd,now please login!',
                            type: 'alert-primary'
                    });
                    }
                });

        })
        .catch(error =>next(error));


});

module.exports =router;