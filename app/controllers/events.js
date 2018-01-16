let config = require('../../config');
var mysql = require('mysql');

exports.createEvents = function(req, res, next) {
    config.query(req, res, next, 'INSERT INTO Events SET ?', req.body);
};
exports.updateEvents = function(req, res, next) {
    config.query(req, res, next, 'UPDATE Events SET ? WHERE eventId = ?',
        [req.body, [req.query.id]]);
};
exports.deleteEvents = function(req, res, next) {
    config.query(req, res, next, 'DELETE FROM Events WHERE eventId = ?',
        [req.query.id]);
};
exports.viewEvents = function(req, res, next) {
    var sql = mysql.format("SELECT * FROM Events WHERE ?", req.query);
    sql = sql.replace(', ', ' AND ');
    config.query(req, res, next, sql);
};
