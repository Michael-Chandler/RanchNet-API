let config = require('../../config');
var mysql = require('mysql');

exports.createCattle = function(req, res, next) {
    config.query(req, res, next, 'INSERT INTO Cattle SET ?', req.body);
};
exports.updateCattle = function(req, res, next) {
    config.query(req, res, next, 'UPDATE Cattle SET ? WHERE cattleId = ?',
        [req.body, [req.query.id]]);
};
exports.deleteCattle = function(req, res, next) {
    config.query(req, res, next, 'DELETE FROM Cattle WHERE cattleId = ?',
        [req.query.id]);
};
exports.viewCattle = function(req, res, next) {
    var sql = mysql.format("SELECT * FROM Cattle WHERE ?", req.query);
    sql = sql.replace(', ', ' AND ');
    config.query(req, res, next, sql);
};
