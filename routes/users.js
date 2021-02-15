const  express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
const passport = require('passport');
const User = require("../models/User");
const bcrypt = require('bcryptjs');

// Login page 
router.get('/login',(req,res)=> res.render("login"));


//Register page 
router.get('/register',(req,res)=> res.render("register"));

const urlencodedParser = bodyParser.urlencoded({ extended: false })
//Register handle 
router.post('/register', urlencodedParser, function (req,res) {
    const {name,email,password,password2 } = req.body
    let errors = [];
    //check required fields are filled or not 
    if(!name || !email || !password || !password2 ){
        errors.push({msg: "Please fill in all fields"});
        
    }
    //check password is matching or not
    if (password !== password2){
        errors.push({msg: "Password is not matching"});
    }

    //Check password length
    if(password.length < 6){
        errors.push({msg: "pasword should be at least 6 characters"});

    }

    //check erros 
    if (errors.length > 0){
        res.render('register',{
            errors,
            name,
            email,
            password,
            password2
        });

    }
    else{
        //validation passed  => go db 
        User.findOne({email:email})
        .then(user => {
            if(user){
                //user already exists 
                errors.push({msg:"Email alreday registerd"});
                res.render('register',{
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
                
            }
            else{
                const newUser = new User({
                    name,
                    email,
                    password
                });
        

                //hash the passwprd
                bcrypt.genSalt(10,(err,salt) => {
                    bcrypt.hash(newUser.password,salt,(err,hash) => {
                        if(err) throw err;
                        //set password to hashed password
                        newUser.password = hash; 
                        //save user to db 
                        newUser.save()
                        .then(user=>{
                            res.redirect('/users/login')
                        })
                        .catch(err =>console.log(err));
                        

                    })
                })
            }
        })
    }
});
  




module.exports = router;