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

router.put('/books/:id', function (req, res, next) {
  Book.findById(req.params.id).then(function (book) {
    return book.update(req.body);
  }).then(function (book) {
    return res.redirect('/library/books/' + book.id);
  }).catch((0, _dataerror2.default)(req, res, next, 'book_detail'));
});

router.put('/patrons/:id', function (req, res, next) {
  Patron.findById(req.params.id).then(function (patron) {
    return patron.update(req.body);
  }).then(function (patron) {
    return res.redirect('/library/patrons/' + patron.id);
  }).catch((0, _dataerror2.default)(req, res, next, 'patron_detail'));
});

router.put('/loans', function (req, res, next) {
  var whereObj = { book_id: req.query.book_id, patron_id: req.query.patron_id };
  var orderObj = [['loaned_on', 'DESC']];
  var queryObj = { where: whereObj, order: orderObj };
  Loan.findOne(queryObj).then(function (loan) {
    return loan.update(req.body);
  }).then(function (loan) {
    res.redirect('/library/loans');
  }).catch((0, _dataerror2.default)(req, res, next, 'loans'));
});

exports.default = router;