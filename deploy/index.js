var path = require('path');
var express = require('express');
var app = express();

app.use(express.static(path.resolve('./dist')));
app.get('/*', function(req, res){
  res.sendFile(path.resolve('./dist/index.html'));
});

app.listen(process.env.PORT || 3001);
