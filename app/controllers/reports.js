let config = require('../../config');
let mysql = require('mysql');

exports.viewReports = function(req, res, next) {
    let token = req.query.token;
    delete req.query.token;
    if (req.query.reportId === undefined) {
        let sql = mysql.format(
            'SELECT reportId, reportName, reportDescription, reportUrl FROM Reports',
            req.query
        );
        config.query(req, res, next, sql, token);
    } else {
        let sql = mysql.format(
            'SELECT reportSQL FROM Reports WHERE `reportId` = ?',
            req.query.reportId
        );
        config.queryreport(req, res, next, sql, token);
    }
};
