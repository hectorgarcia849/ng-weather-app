require('./config/config');

const express = require('express');
const app = express();
const path = require('path');
const {servicesRouter} = require('./routes/services.js')

app.use(express.static(__dirname + '/../dist'));

app.listen(process.env.PORT || 8080);

//PathLocationStrategy for Angular routing (ensure angular handles routing)
app.get('/home', function(req, res) {
  res.sendFile(path.join(__dirname + '/../dist/index.html'));
});

app.use('/services', servicesRouter);
