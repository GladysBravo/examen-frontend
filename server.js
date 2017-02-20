var express = require('express');
var compression = require('compression');
var serve = express();
var app = express();
var port = 3100;
var appName = '/app';
var gzipStatic = require('connect-gzip-static');
var fs = require('fs');
var cors = require('cors');
var dir = './dist';

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

serve.use(appName, app);

app.use(compression());
app.use(gzipStatic(__dirname + '/dist'));

// Begin Fake auth
serve.use(cors());
serve.post('/auth', function (req, res) {
    var data = JSON.parse(fs.readFileSync('data-auth.example.json', 'utf8'));
    res.send(data);
});

serve.get('/test', (req, res) => {
    res.send({'hola' : 'mundo'});
});
// End Fake auth

serve.listen(port, function () {
  console.log('Frontend app listening on port: ' + port);
});