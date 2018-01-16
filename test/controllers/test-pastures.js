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

describe('Pastures', function() {
    it('should respond to POST requests', function(done) {
        chai.request(server)
            .post('/pastures')
            .send({'id': 1})
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });
    it('should respond to PUT requests', function(done) {
        chai.request(server)
            .put('/pastures/1')
            .send({'id': 1})
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });
    it('should respond to DEL requests', function(done) {
        chai.request(server)
            .delete('/pastures/1')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });
    it('should respond to GET requests', function(done) {
        chai.request(server)
            .get('/pastures/1')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });
    
});