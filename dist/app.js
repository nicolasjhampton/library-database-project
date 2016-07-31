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

var _methodOverride = require('method-override');

var _methodOverride2 = _interopRequireDefault(_methodOverride);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

// enables put and delete routes
app.use((0, _methodOverride2.default)('_method'));

app.set('views', _path2.default.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/library/static', _express2.default.static(_path2.default.join(__dirname, 'public')));
app.use('/library', _routes2.default);

app.use(function (req, res, next) {
  var err = new Error('This page does not exist!');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {

  var template = 'home';

  switch (err.status) {
    case 500:
      template = res.locals.render;
      break;
    default:
      template = 'error';
      break;
  }

  return res.render(template, { error: err });
  // TODO: enable error handling through sessions
});

var server = _http2.default.createServer(app);

_models2.default.sequelize.sync().then(function () {
  server.listen(process.env.PORT || 3000);
});