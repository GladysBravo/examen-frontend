let express = require('express');
let compression = require('compression');
let serve = express();
let app = express();
let gzipStatic = require('connect-gzip-static');
let fs = require('fs');
let cors = require('cors');
let dir = './dist';
let config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

let port = config.port;
let appName = config.subDomain;

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

serve.use(appName, app);

app.use(compression());
app.use(gzipStatic(__dirname + '/dist'));

// Begin Fake auth
serve.use(cors());
serve.post('/autenticar', (req, res) => {
    let data = JSON.parse(fs.readFileSync('data-auth.example.json', 'utf8'));
    res.send(data);
});

serve.get('/test', (req, res) => {
    res.send({
        count: 2,
        results: [{ name: 'christian', age: 21 }, { name: 'anthony', age: 88 }],
        page: 1
    });
});
// End Fake auth

serve.listen(port, function () {
  console.log('Frontend app listening on port: ' + port);
});