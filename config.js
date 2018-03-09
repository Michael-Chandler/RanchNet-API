let mysql = require('mysql');
let executeTransaction = function(req, res, next, sql, token) {
    return new Promise(function(resolve, reject) {
        let success = true;
        let connection = mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USERNAME,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
        });
        connection.connect((er) => {
            if (er) {
                reject(er);
                if (process.env.ENVIRONMENT == 'development') throw er;
            } else {
                connection.beginTransaction((err) => {
                    if (err) {
                        success = false;
                        reject(err);
                        if (process.env.ENVIRONMENT == 'development') throw err;
                    }
                    connection.query(sql, function(erro, results, fields) {
                        if (erro) {
                            return connection.rollback(function() {
                                success = false;
                                reject(erro);
                            });

                            if (process.env.ENVIRONMENT == 'development') throw erro;
                        }
                        connection.commit(function(error) {
                            if (error) {
                                return connection.rollback(function() {
                                    success = false;
                                    reject(error);
                                });
                                if (process.env.ENVIRONMENT == 'development') throw error;
                            }
                            if (success &&
                                Object.keys(results).length !== 0 &&
                                results.constructor !== Object) {
                                resolve(results);
                            } else reject(false);
                            connection.end();
                        });
                    });
                });
            };
        });
    });
};
module.exports = {
    name: 'RanchNet-API',
    hostname: process.env.HOST,
    version: process.env.VERSION,
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    query: function(req, res, next, sql, token) {
        let authsql = mysql.format('SELECT * FROM Tokens WHERE tokenValue = ?', token);
        executeTransaction(req, res, next, authsql, token)
        .then(function(fulfilled) {
            executeTransaction(req, res, next, sql, token)
            .then(function(fulfilled) {
                res.json(fulfilled);
            })
            .catch(function(error) {
                res.json({});
            });
        })
        .catch(function(error) {
            res.json({token: 'invalid'});
        });
    },
    queryreport: function(req, res, next, sql, token) {
        let authsql = mysql.format('SELECT * FROM Tokens WHERE tokenValue = ?', token);
        executeTransaction(req, res, next, authsql, token)
        .then(function(fulfilled) {
            executeTransaction(req, res, next, sql, token)
            .then(function(fulfilled) {
                executeTransaction(req, res, next, fulfilled[0].reportSQL, token)
                .then(function(fulfilled) {
                    res.json(fulfilled);
                })
                .catch(function(error) {
                    res.json({});
                });
            })
            .catch(function(error) {
                res.json({});
            });
        })
        .catch(function(error) {
            res.json({token: 'invalid'});
        });
    },
};
