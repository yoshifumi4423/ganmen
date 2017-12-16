const express = require('express');

const app = express();

app.listen(process.env.PORT || 3000, function(){
  console.log("server listen");
});

app.get('/', function(req, res){
  res.send("hello world123");
})
