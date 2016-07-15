var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', express.static('public'));

app.listen(port, function(){
    console.log('server is running...');
});