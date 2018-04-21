const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

//use static first before doing any configuring of routers.
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

//express routers.
const main = require('./routes/main'); 
app.use('', main);
//end of express router

port = process.env.port || 3000;
app.listen(port, function(){
    console.log("connected to port");
});
