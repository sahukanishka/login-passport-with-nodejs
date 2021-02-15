const  express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

// Login page 
router.get('/login',(req,res)=> res.render("login"));


//Register page 
router.get('/register',(req,res)=> res.render("register"));

const urlencodedParser = bodyParser.urlencoded({ extended: false })
//Register handle 
router.post('/register', urlencodedParser, function (req,res) {
    console.log(req.body)
    res.send('hii')

});
 




module.exports = router;