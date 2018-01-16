require('dotenv').config();
let restify = require('restify');
let fs = require('fs');
let controllers = {};
let controllersPath = `${process.cwd()}/app/controllers`;

fs.readdirSync(controllersPath).forEach((file) => {
    if (file.indexOf('.js') != -1) {
        controllers[file.split('.')[0]] = require(controllersPath + '/'
            + file);
    }
});

let server = restify.createServer();

// Define RESTify Plugins
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());

// Define RESTify Endpoints

// Documentation Start
server.get('/', controllers.documentation.viewDocumentation);

// Users Start
server.post('/users', controllers.users.createUsers);
server.put('/users/:id', controllers.users.updateUsers);
server.del('/users/:id', controllers.users.deleteUsers);
server.get('/users', controllers.users.viewUsers);

// Cattle Start
server.post('/cattle', controllers.cattle.createCattle);
server.put('/cattle/:id', controllers.cattle.updateCattle);
server.del('/cattle/:id', controllers.cattle.deleteCattle);
server.get('/cattle', controllers.cattle.viewCattle);

// Pastures Start
server.post('/pastures', controllers.pastures.createPastures);
server.put('/pastures/:id', controllers.pastures.updatePastures);
server.del('/pastures/:id', controllers.pastures.deletePastures);
server.get('/pastures', controllers.pastures.viewPastures);

// Settings Start
server.post('/settings', controllers.settings.createSettings);
server.put('/settings/:id', controllers.settings.updateSettings);
server.del('/settings/:id', controllers.settings.deleteSettings);
server.get('/settings', controllers.settings.viewSettings);

// Start Server
server.listen(process.env.PORT, (err) => {
    if (err) {
console.error(err);
} else {
console.log('App is ready at : ' + process.env.PORT);
}
});

if (process.env.environment == 'production') {
process.on('uncaughtException', function(err) {
        console.error(JSON.parse(
            JSON.stringify(err, ['stack', 'message', 'inner'], 2)));
});
}

/**
 * Stops the RESTify server gently.
 *
 */
function stop() {
    server.close();
}

module.exports = server;
module.exports.stop = stop;
