let config = require('../../config');
var mysql = require('mysql');

exports.createUsers = function(req, res, next) {
    config.query(req, res, next, 'INSERT INTO Users SET ?', req.body);
};
exports.updateUsers = function(req, res, next) {
    config.query(req, res, next, 'UPDATE Users SET ? WHERE userId = ?',
        [req.body, [req.query.id]]);
};
exports.deleteUsers = function(req, res, next) {
    config.query(req, res, next, 'DELETE FROM Users WHERE userId = ?',
        [req.query.id]);
};
exports.viewUsers = function(req, res, next) {
    var sql = mysql.format("SELECT * FROM Users WHERE ?", req.query);
    sql = sql.replace(', ', ' AND ');
    config.query(req, res, next, sql);
};
