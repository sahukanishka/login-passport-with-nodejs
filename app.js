const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts');
const port = 3000

//Ejs 

app.use(expressLayouts);
app.set('view engine','ejs');


//routes 
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));


app.listen(port, () => console.log(`listening on port ${port}`))