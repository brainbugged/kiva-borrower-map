const path = require('path');

var express = require('express');
var app = express();

app.get('/api', (req, res) => {
  res.json({message: 'Welcome to the Server'});
});

app.use(express.static(path.resolve('dist')));

app.listen(8081, ()=>{
  console.log('API listening on port 8081');
});
