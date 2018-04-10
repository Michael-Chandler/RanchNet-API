let config = require('../../config');
let mysql = require('mysql');

exports.createCattle = function(req, res, next) {
    let sql = mysql.format('INSERT INTO Cattle SET ?', req.body);
    config.query(req, res, next, sql, req.query.token);
};
exports.updateCattle = function(req, res, next) {
    let token = req.query.token;
    delete req.query.token;
    let sql = mysql.format('UPDATE Cattle SET ? WHERE cattleId = ?',
        [req.body, req.query.cattleId]);
    config.query(req, res, next, sql, token);
};
exports.deleteCattle = function(req, res, next) {
    let sql = mysql.format('DELETE FROM Cattle WHERE cattleId = ?',
        [req.query.cattleId]);
    config.query(req, res, next, sql, req.query.token);
};
exports.viewCattle = function(req, res, next) {
    let token = req.query.token;
    delete req.query.token;
    let sql = mysql.format('SELECT * FROM Cattle LEFT JOIN Pastures ON Cattle.pastureId = Pastures.pastureId WHERE ?', req.query);
    sql = sql.replace(', ', ' AND ');
    config.query(req, res, next, sql, token);
};
