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

router.get('/', function (req, res, next) {
  return res.render('home');
});

router.get('/books', function (req, res, next) {
  var obj = {};
  obj = req.query.status == 'overdue' ? { include: { model: Loan, where: { return_by: { $gt: new Date() } } } } : obj;
  obj = req.query.status == 'checked_out' ? { include: { model: Loan, where: { returned_on: { $eq: null } } } } : obj;
  Book.findAll(obj).then(function (books) {
    return res.render('books', { books: books });
  }).catch((0, _dataerror2.default)(res));
});

router.get('/books/:id', function (req, res, next) {
  if (req.params.id == 'new') {
    return next();
  }
  var bookInfo = [{ model: Loan, include: [{ model: Patron }] }];
  Book.findOne({ where: { id: req.params.id }, include: bookInfo }).then(function (book) {
    return res.render('book_detail', { book: book, loans: book.Loans });
  }).catch((0, _dataerror2.default)(res));
});

router.get('/books/new', function (req, res, next) {
  return res.render('new_book');
});

router.get('/loans', function (req, res, next) {
  var obj = {};
  obj = req.query.status == 'overdue' ? { return_by: { $gt: new Date() } } : obj;
  obj = req.query.status == 'checked_out' ? { returned_on: { $eq: null } } : obj;
  Loan.findAll({ where: obj, include: [{ model: Book }, { model: Patron }] }).then(function (loans) {
    return res.render('loans', { loans: loans });
  }).catch((0, _dataerror2.default)(res));
});

router.get('/loans/new', function (req, res, next) {
  Book.findAll().then(function (books) {
    Patron.findAll().then(function (patrons) {
      var current = new Date();
      var loaned_on = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
      var weekFromNow = new Date(current.setDate(current.getDate() + 7));
      var return_by = weekFromNow.getFullYear() + '-' + (weekFromNow.getMonth() + 1) + '-' + weekFromNow.getDate();
      return res.render('new_loan', { loaned_on: loaned_on, return_by: return_by, books: books, patrons: patrons });
    });
  });
});

router.get('/patrons', function (req, res, next) {
  Patron.findAll().then(function (patrons) {
    return res.render('patrons', { patrons: patrons });
  }).catch((0, _dataerror2.default)(res));
});

router.get('/patrons/new', function (req, res, next) {
  return res.render('new_patron');
});

router.get('/patrons/:id', function (req, res, next) {
  var patronInfo = [{ model: Loan, include: [{ model: Book }] }];
  Patron.findOne({ where: { id: req.params.id }, include: patronInfo }).then(function (patron) {
    console.log(patron.Loans);
    return res.render('patron_detail', { patron: patron, loans: patron.Loans });
  }).catch((0, _dataerror2.default)(res));;
});

exports.default = router;