import express from 'express';

var app = express();

app.use(express.static('app'))

app.listen(80, function () {
  console.log(`app listening on port 80...`);
});