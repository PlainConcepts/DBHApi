var fs         = require('fs');
var mime       = require('mime');
var urlRepository = require('./urlRepository');

module.exports = {
    registerRoutes: function(app){
        app.get('/api/urls', function(req, res){
            urlRepository.find().then(function(urls){
                res.json(urls);
            });
        });

        app.post('/api/urls', function(req, res){
             urlRepository.create(req.body).then(function(url){
                 res.json(url);
             });
        });

        app.put('/api/urls/:id', function(req, res){
            urlRepository.update(req.params.id, req.body).then(function(url){
                res.json(url);
            });
        });

        app.delete('/api/urls/:id', function(req, res){
            urlRepository.remove(req.params.id).then(function (url) {
                res.send(url);
            });
        });

        app.use('/api/ico/:path', function(req, res) {
            var imgPath = 'images/url-icons/' + req.params.path;
            var contentType = mime.lookup(imgPath);
            var img = fs.readFileSync(imgPath);

            res.writeHead(200, {'Content-Type': contentType });
            res.end(img, 'binary');
        });
    }
};