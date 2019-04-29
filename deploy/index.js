const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(path.resolve('./dist')));
app.get('/*', (req, res) => {
  res.sendFile(path.resolve('./dist/index.html'), err => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(process.env.PORT || 3001);
