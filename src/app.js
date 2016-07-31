"use strict";

import 'babel-polyfill';
import path from 'path';
import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import methodOverride from 'method-override';
import routes from './routes';
import db from '../models';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// enables put and delete routes
app.use(methodOverride('_method'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/library/static', express.static(path.join(__dirname, 'public')));
app.use('/library', routes);

app.use((req, res, next) => {
  var err = new Error('This page does not exist!');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {

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


var server = http.createServer(app);

db.sequelize.sync().then(() => {
  server.listen(process.env.PORT || 3000);
});
