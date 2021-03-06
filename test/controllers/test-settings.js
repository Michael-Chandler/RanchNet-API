let async = require('async');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = require('chai').should();
let server;

chai.use(chaiHttp);

before(async () => {
    server = require('../../app');
});

after(async () => {
    require('../../app').stop();
});

describe('Settings', function() {
    it('should respond to POST requests', function(done) {
        chai.request(server)
            .post('/settings')
            .send({'id': 1})
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });
    it('should respond to PUT requests', function(done) {
        chai.request(server)
            .put('/settings/1')
            .send({'id': 1})
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });
    it('should respond to DEL requests', function(done) {
        chai.request(server)
            .delete('/settings/1')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });
    it('should respond to GET requests', function(done) {
        chai.request(server)
            .get('/settings/1')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });
});
