let config = require('../../config');
var mysql = require('mysql');

exports.createCattle = function(req, res, next) {
    var sql = mysql.format("INSERT INTO Cattle SET ?", req.body);
    config.query(req, res, next, sql, req.query.token);
};
exports.updateCattle = function(req, res, next) {
    var token = req.query.token;
    delete req.query.token;
    var sql = mysql.format("UPDATE Cattle SET ? WHERE cattleId = ?", [req.body, req.query.cattleId]);
    config.query(req, res, next, sql, token);
};
exports.deleteCattle = function(req, res, next) {
    var sql = mysql.format("DELETE FROM Cattle WHERE cattleId = ?", [req.query.cattleId]);
    config.query(req, res, next, sql, req.query.token);
};
exports.viewCattle = function(req, res, next) {
    var token = req.query.token;
    delete req.query.token;
    var sql = mysql.format("SELECT * FROM Cattle WHERE ?", req.query);
    sql = sql.replace(', ', ' AND ');
    config.query(req, res, next, sql, token);
};
