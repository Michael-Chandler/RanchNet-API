let config = require('../../config');
let mysql = require('mysql');

exports.viewPairing = function(req, res, next) {
    let token = req.query.token;
    delete req.query.token;
    let sql = mysql.format(`
    SELECT * 
        FROM Cattle c1 
        WHERE userId = ` + req.query.userId + ` 
            AND c1.cattleDamName 
                NOT IN (SELECT cattleDamName 
                FROM Cattle 
                WHERE userId = ` + req.query.userId + `
                    AND cattleId = ` + req.query.cattleId + `) 
            AND c1.cattleSireName 
                NOT IN (SELECT cattleSireName 
                FROM Cattle 
                WHERE userId = ` + req.query.userId + `
                    AND cattleId = ` + req.query.cattleId + `) 
            AND c1.cattleSex 
                NOT IN (SELECT cattleSex 
                FROM Cattle 
                WHERE userId = ` + req.query.userId + `
                    AND cattleId = ` + req.query.cattleId + `) 
    `, req.query);
    sql = sql.replace(/,/g, ' AND');
    console.log(sql);
    config.query(req, res, next, sql, token);
};
