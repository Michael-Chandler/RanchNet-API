let config = require('../../config');
var mysql = require('mysql');

exports.createPastures = function(req, res, next) {
    config.query(req, res, next, 'INSERT INTO Pastures SET ?', req.body);
};
exports.updatePastures = function(req, res, next) {
    config.query(req, res, next, 'UPDATE Pastures SET ? WHERE pastureId = ?',
        [req.body, [req.query.id]]);
};
exports.deletePastures = function(req, res, next) {
    config.query(req, res, next, 'DELETE FROM Pastures WHERE pastureId = ?',
        [req.query.id]);
};
exports.viewPastures = function(req, res, next) {
    var sql = mysql.format("SELECT * FROM Pastures WHERE ?", req.query);
    sql = sql.replace(', ', ' AND ');
    config.query(req, res, next, sql);
};
