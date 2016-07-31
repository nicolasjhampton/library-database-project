'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

var _dataerror = require('./dataerror');

var _dataerror2 = _interopRequireDefault(_dataerror);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var Book = _models2.default.Book;
var Loan = _models2.default.Loan;
var Patron = _models2.default.Patron;

router.post('/books', function (req, res, next) {
  if (req.params._method == 'PUT') {
    return next();
  }
  Book.create(req.body).then(function (book) {
    return res.redirect('/library/books/' + book.id);
  }).catch((0, _dataerror2.default)(req, res, next, 'new_book'));
});

router.post('/patrons', function (req, res, next) {
  if (req.params._method == 'PUT') {
    return next();
  }
  Patron.create(req.body).then(function (patron) {
    return res.redirect('/library/patrons/' + patron.id);
  }).catch((0, _dataerror2.default)(req, res, next, 'new_patron'));
});

router.post('/loans', function (req, res, next) {
  if (req.params._method == 'PUT') {
    return next();
  }
  Loan.create(req.body).then(function (loan) {
    return res.redirect('/library/patrons/' + loan.patron_id);
  }).catch((0, _dataerror2.default)(req, res, next, 'loans'));
});

exports.default = router;