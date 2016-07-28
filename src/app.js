"use strict";
import 'babel-polyfill';
import path from 'path';
import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import routes from './routes';
import db from '../models';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/library/static', express.static(path.join(__dirname, 'public')));
app.use('/library', routes);


var server = http.createServer(app);

db.sequelize.sync().then(function() {
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
