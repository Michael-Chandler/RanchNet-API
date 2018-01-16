var async = require('async');
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = require('chai').should();
var server;

chai.use(chaiHttp);

before(async () => {
    server = require('../../app');
});

after(async () => {
    require('../../app').stop();
});

describe('Users', function() {
    it('should respond to POST requests', function(done) {
        chai.request(server)
            .post('/users')
            .send({'id': 1})
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });
    it('should respond to PUT requests', function(done) {
        chai.request(server)
            .put('/users/1')
            .send({'id': 1})
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });
    it('should respond to DEL requests', function(done) {
        chai.request(server)
            .delete('/users/1')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });
    it('should respond to GET requests', function(done) {
        chai.request(server)
            .get('/users/1')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });
    
});
