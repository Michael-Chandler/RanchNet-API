let config = require('../../config');
let fs = require('fs');

exports.viewDocumentation = function(req, res, next) {
    fs.readFile('documentation.html', function(err, data) {
        if (err) res.send(err);
        else res.sendRaw(data);
    });
};
