let config = require('../../config');
var mysql = require('mysql');

exports.createSettings = function(req, res, next) {
    config.query(req, res, next, 'INSERT INTO Settings SET ?', req.body);
};
exports.updateSettings = function(req, res, next) {
    config.query(req, res, next, 'UPDATE Settings SET ? WHERE settingsId = ?',
        [req.body, [req.query.id]]);
};
exports.deleteSettings = function(req, res, next) {
    config.query(req, res, next, 'DELETE FROM Settings WHERE settingsId = ?',
        [req.query.id]);
};
exports.viewSettings = function(req, res, next) {
    var sql = mysql.format("SELECT * FROM Settings WHERE ?", req.query);
    sql = sql.replace(', ', ' AND ');
    config.query(req, res, next, sql);
};
