var request = require('supertest')
    , app = require('../../app');

describe('GET /api/urls', function () {

    it('should respond with 200', function (done) {
        request(app)
            .get('/api/urls')
            .expect('Content-Type', /json/)
            .expect(200, done);
    })

});
