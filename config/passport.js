const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


//Local user model 

const User = require("../models/User");


module.exports = function(passport){
    passport.use(
        new localStrategy({usernameField:"email"},(email,password,done)=>{
            //match  user 
            User.findOne({email:email})
            .then(user=>{
                if(!user) {
                    return done(null, false,{message:"email is not registered"});

                }
                //match password 
                bcrypt.compare(passport,user.password, (err,isMatch)=>{
                    if(err) throw err ;


                    if(isMatch) {
                        return done(null,user);
                    }
                    else{
                        return done(null,false,{message:'password incorrect'});
                    }
                });
            })
            .catch(err => console.log(err));
        })
    );

passport.serializeUser(function(id,done){
    done(null,user.id);
});

passport.deserializeUser(function(id,done){
    User.findById(id, function(err,user){
        done(err,user);
    });
})

}