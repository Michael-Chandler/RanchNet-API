let config = require('../../config');
let mysql = require('mysql');

exports.createSettings = function(req, res, next) {
    let sql = mysql.format('INSERT INTO Settings SET ?', req.body);
    config.query(req, res, next, sql, req.query.token);
};
exports.updateSettings = function(req, res, next) {
    let token = req.query.token;
    delete req.query.token;
    let sql = mysql.format('UPDATE Settings SET ? WHERE settingId = ?',
        [req.body, req.query.settingId]);
    config.query(req, res, next, sql, token);
};
exports.deleteSettings = function(req, res, next) {
    let sql = mysql.format('DELETE FROM Settings WHERE settingId = ?',
        [req.query.settingId]);
    config.query(req, res, next, sql, req.query.token);
};
exports.viewSettings = function(req, res, next) {
    let token = req.query.token;
    delete req.query.token;
    let sql = mysql.format('SELECT * FROM Settings WHERE ?', req.query);
    sql = sql.replace(/,/g, ' AND');
    config.query(req, res, next, sql, token);
};
