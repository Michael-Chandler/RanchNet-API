let config = require('../../config');
let mysql = require('mysql');

exports.createPastures = function(req, res, next) {
    let sql = mysql.format('INSERT INTO Pastures SET ?', req.body);
    config.query(req, res, next, sql, req.query.token);
};
exports.updatePastures = function(req, res, next) {
    let token = req.query.token;
    delete req.query.token;
    let sql = mysql.format('UPDATE Pastures SET ? WHERE pastureId = ?',
        [req.body, req.query.pastureId]);
    config.query(req, res, next, sql, token);
};
exports.deletePastures = function(req, res, next) {
    let sql = mysql.format('DELETE FROM Pastures WHERE pastureId = ?',
        [req.query.pastureId]);
    config.query(req, res, next, sql, req.query.token);
};
exports.viewPastures = function(req, res, next) {
    let token = req.query.token;
    delete req.query.token;
    let sql = mysql.format('SELECT * FROM Pastures WHERE ?', req.query);
    sql = sql.replace(', ', ' AND ');
    config.query(req, res, next, sql, token);
};
