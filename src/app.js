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
const idLookup = require('./idLookup');

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
        fetch('https://cflscoreboard.cfl.ca/json/scoreboard/squads.json')
          .then(function(res) {
            return res.json();
          }).then(function(json) {
              var records = {};
              json.forEach(function(team) {
                console.log(team);
                var recordString = team.wins + "-";
                    recordString += team.loss + "-";
                    recordString += team.draw;
                records[idLookup[team.id]] = recordString;
              });
              socket.emit('cflStandings', records);
          });
      });
    });
  }, {timeout: 10000}))
  .configure(services)
  .configure(middleware);

module.exports = app;


