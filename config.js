var mysql = require('mysql');
 
module.exports = {
    name: 'RanchNet-API',
    hostname : process.env.HOST,
    version: process.env.VERSION,
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    query: function(req, res, next, querystring, data) {
        let success = true;
        let connection = mysql.createConnection({
            host     : process.env.HOST,
            user     : process.env.USERNAME,
            password : process.env.PASSWORD,
            database : process.env.DATABASE
        });
        connection.connect((er) => {
            if(er) res.json({Success: false});
            else {
                connection.beginTransaction((err) => {
                    if (err) success = false;
                    connection.query(querystring, data, function(error, results, fields) {
                        if (error) {
                            return connection.rollback(function() {
                                success = false;
                            });
                        }
                        connection.commit(function(err) {
                            if (err) {
                                return connection.rollback(function() {
                                    success = false;
                                });
                            }
                            if (success) res.json(results);
                            else res.json({Success: success});
                            connection.end();
                            next();
                        });
                    });
                });
            };
        });
    }
}
