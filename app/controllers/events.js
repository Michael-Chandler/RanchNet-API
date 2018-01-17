let config = require('../../config');
var mysql = require('mysql');

exports.createEvents = function(req, res, next) {
    var sql = mysql.format("INSERT INTO Events SET ?", req.body);
    config.query(req, res, next, sql, req.query.token);
};
exports.updateEvents = function(req, res, next) {
    var token = req.query.token;
    delete req.query.token;
    var sql = mysql.format("UPDATE Events SET ? WHERE eventId = ?", [req.body, req.query.eventId]);
    config.query(req, res, next, sql, token);
};
exports.deleteEvents = function(req, res, next) {
    var sql = mysql.format("DELETE FROM Events WHERE eventId = ?", [req.query.eventId]);
    config.query(req, res, next, sql, req.query.token);
};
exports.viewEvents = function(req, res, next) {
    var token = req.query.token;
    delete req.query.token;
    var sql = mysql.format("SELECT * FROM Events WHERE ?", req.query);
    sql = sql.replace(', ', ' AND ');
    config.query(req, res, next, sql, token);
};
