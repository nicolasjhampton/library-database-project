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

router.post('/books/:id', function (req, res, next) {
  Book.findById(req.params.id).then(function (book) {
    return book.update(req.body);
  }).then(function (book) {
    res.redirect('/library/books/' + book.id);
  }).catch((0, _dataerror2.default)(res));
});

router.post('/patrons/:id', function (req, res, next) {
  Patron.findById(req.params.id).then(function (patron) {
    return patron.update(req.body);
  }).then(function (patron) {
    res.redirect('/library/patrons/' + patron.id);
  }).catch((0, _dataerror2.default)(res));
});

// router.put('/loans/:id', (req, res, next) => {
//   Loan.findOne(req.body).then((loan) => {
//     res.redirect(`/library/patrons/${loan.patron_id}`);
//   });
// });

exports.default = router;