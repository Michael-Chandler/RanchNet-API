let config = require('../../config');
var mysql = require('mysql');

exports.createUsers = function(req, res, next) {
    var sql = mysql.format("INSERT INTO Users SET ?", req.body);
    config.query(req, res, next, sql, req.query.token);
};
exports.updateUsers = function(req, res, next) {
    var token = req.query.token;
    delete req.query.token;
    var sql = mysql.format("UPDATE Users SET ? WHERE userId = ?", [req.body, req.query.userId]);
    config.query(req, res, next, sql, token);
};
exports.deleteUsers = function(req, res, next) {
    var sql = mysql.format("DELETE FROM Users WHERE userId = ?", [req.query.userId]);
    config.query(req, res, next, sql, req.query.token);
};
exports.viewUsers = function(req, res, next) {
    var token = req.query.token;
    delete req.query.token;
    var sql = mysql.format("SELECT * FROM Users WHERE ?", req.query);
    sql = sql.replace(', ', ' AND ');
    config.query(req, res, next, sql, token);
};
