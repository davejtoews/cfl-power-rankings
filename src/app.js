'use strict';

const path = require('path');
const serveStatic = require('feathers').static;
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const feathers = require('feathers');
const configuration = require('feathers-configuration');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const bodyParser = require('body-parser');
const socketio = require('feathers-socketio');
const middleware = require('./middleware');
const services = require('./services');
const fetch = require('node-fetch');

const app = feathers();

app.configure(configuration(path.join(__dirname, '..')));

const whitelist = app.get('corsWhitelist');
const corsOptions = {
  origin(origin, callback){
    const originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  }
};

app.use(compress())
  .options('*', cors(corsOptions))
  .use(cors(corsOptions))
  .use(favicon( path.join(app.get('public'), 'favicon.ico') ))
  .use('/', serveStatic( app.get('public') ))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .configure(hooks())
  .configure(rest())
  .configure(socketio(function(io) {
    io.on('connection', function(socket) {
      socket.on('cflStandings', function () {
        var apiKeys = app.get('apiKeys');
        fetch('http://api.cfl.ca/v1/standings/2021?key=' + apiKeys.CFL)
            .then(function(res) {
                return res.json();
            }).then(function(json) {
                var westStandings = json.data.divisions.west.standings;
                var standings = westStandings.concat(json.data.divisions.east.standings);
                var records = {};
                standings.forEach(function(team) {
                  var recordString = team.wins + "-";
                      recordString += team.losses + "-";
                      recordString += team.ties;
                  records[team.team_id] = recordString;
                });
                socket.emit('cflStandings', records);
            });
      });
    });
  }, {timeout: 10000}))
  .configure(services)
  .configure(middleware);

module.exports = app;


