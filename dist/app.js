"use strict";

require('babel-polyfill');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

app.set('views', _path2.default.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/library/static', _express2.default.static(_path2.default.join(__dirname, 'public')));
app.use('/library', _routes2.default);

var server = _http2.default.createServer(app);

_models2.default.sequelize.sync().then(function () {
  server.listen(process.env.PORT || 3000);
});

// {
//   "development": {
//     "storage": "library.db",
//     "dialect": "sqlite"
//   },
//   "test": {
//     "storage": "library.db",
//     "dialect": "sqlite"
//   },
//   "production": {
//     "storage": "library.db",
//     "dialect": "sqlite"
//   }
// }