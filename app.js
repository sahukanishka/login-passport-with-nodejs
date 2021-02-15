const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const port = 3000

const app = express()

//DB config 
const url = `mongodb+srv://admin:LeLRxKtIgIOj6Scz@cluster0.dfnul.mongodb.net/Cluster0?retryWrites=true&w=majority`;

//connect to momgo db
const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}

mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database.. ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

//ejs 
app.use(expressLayouts);
app.set('view engine','ejs');

//boday parser
// app.use(express,urlencoded({extended:false}));


//routes 
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));



app.listen(port, () => console.log(`listening on port ${port}`))


