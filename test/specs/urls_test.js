var request = require('supertest')
    , app = require('../../app')
    , urlRepository = require('../../urls/urlRepository')
    , bodyParser = require('body-parser')
    , should = require('should');

describe('GET /api/urls', function () {
    var url = {
        name: "mozilla",
        ico: "mozilla.ico",
        urls: [ "*://developer.mozilla.org/*"]
    };

    var urlId;

    beforeEach(function(done){
        urlRepository.create(url).then(function (createdUrl) {
            urlId = createdUrl._id;
            done();
        });
    });

    afterEach(function(done){
        urlRepository.remove(urlId).then(function() {
            done();
        });
    });

    it('should get a list with one url', function (done) {
        request(app)
            .get('/api/urls')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    throw err;
                }

                res.body.length.should.be.exactly(1);
                res.body[0].name.should.be.exactly(url.name);
                res.body[0].ico.should.be.exactly(url.ico);
                res.body[0].urls.should.eql(url.urls);

                done();
            });
    });
});

describe('POST /api/urls/', function () {
    var urlId;

    afterEach(function(done){
        urlRepository.remove(urlId).then(function() {
            done();
        });
    });

    it('should add one url', function (done) {
        request(app)
            .post('/api/urls/')
            .send({
                name: "mozilla",
                ico: "mozilla.ico",
                urls: [ "*://developer.mozilla.org/*"]
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) {
                    throw err;
                }

                urlId = res.body._id;

                urlRepository.find().then(function(urls){
                    urls.length.should.be.exactly(1);
                    done();
                });
            });
    });
});

describe('PUT /api/urls/id', function () {
    var urlId;

    var url = {
        name: "mozilla",
        ico: "mozilla.ico",
        urls: [ "*://developer.mozilla.org/*"]
    };

    var newUrlData = {
        name: "msdn",
        ico: "msdn.ico",
        urls: [ "*://developer.msdn.com/*"]
    };

    beforeEach(function(done){
        urlRepository.create(url).then(function (createdUrl) {
            urlId = createdUrl._id;
            done();
        });
    });

    afterEach(function(done){
        urlRepository.remove(urlId).then(function() {
            done();
        });
    });

    it('should change the url name, ico and urls', function (done) {
        request(app)
            .put('/api/urls/' + urlId)
            .send(newUrlData)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) {
                    throw err;
                }

                urlId = res.body._id;

                res.body.name.should.be.exactly(newUrlData.name);
                res.body.ico.should.be.exactly(newUrlData.ico);
                res.body.urls.should.eql(newUrlData.urls);

                done();
            });
    });
});


describe('delete /api/urls/id', function () {
    var urlId;

    var url = {
        name: "mozilla",
        ico: "mozilla.ico",
        urls: [ "*://developer.mozilla.org/*"]
    };

    beforeEach(function(done){
        urlRepository.create(url).then(function (createdUrl) {
            urlId = createdUrl._id;
            done();
        });
    });

    afterEach(function(done){
        urlRepository.remove(urlId).then(function() {
            done();
        });
    });

    it('should delete the url', function (done) {
        request(app)
            .delete('/api/urls/' + urlId)
            //.expect(200)
            .end(function(err) {
                if (err) {
                    throw err;
                }

                urlRepository.find().then(function(urls){
                    urls.length.should.be.exactly(0);
                    done();
                });
            });
    });
});

