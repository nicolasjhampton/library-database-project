'use strict';

import express from 'express';
import db from '../../models';
import dataError from './dataerror';

var router = express.Router();

var Book = db.Book;
var Loan = db.Loan;
var Patron = db.Patron;

function now() {
  var current = new Date();
  var month = (current.getMonth() < 10) ? ("0" + (current.getMonth() + 1)) : (current.getMonth() + 1);
  var date = (current.getDate() < 10) ? ("0" + current.getDate()) : current.getDate();
  return current.getFullYear() + "-" + month + "-" + date;
}

router.get('/', (req, res, next) => {
  return res.render('home');
});

router.get('/books', (req, res, next) => {
  var obj = {};
  obj = (req.query.status == 'overdue') ? { include: { model: Loan, where: { return_by: { $gt: new Date() } } } } : obj;
  obj = (req.query.status == 'checked_out') ? { include: { model: Loan, where: { returned_on: { $eq: null } } } } : obj;
  Book.findAll(obj).then((books) => {
    return res.render('books', { books: books });
  })
  .catch(dataError(req, res, next, 'home'));
});

router.get('/books/new', (req, res, next) => {
  return res.render('new_book', { book: Book.build() });
});

router.get('/books/:id', (req, res, next) => {
  if(req.params.id == 'new') { return next(); }
  var bookInfo = [{ model: Loan, include: [{ model: Patron }] }];
  Book.findOne({ where: { id: req.params.id }, include: bookInfo })
      .then((book) => {
        return res.render('book_detail', { book: book, loans: book.Loans });
      })
      .catch(dataError(req, res, next, 'books'));
});

router.get('/loans', (req, res, next) => {
  if(req.query.book_id && req.query.patron_id) { return next(); }
  if(req.params.id == 'new') { return next(); }
  var obj = {};
  var current = new Date();
  obj = (req.query.status == 'overdue') ? { return_by: { $lt: current } } : obj;
  obj = (req.query.status == 'checked_out') ? { returned_on: { $eq: null } } : obj;
  Loan.findAll({ where: obj, include: [ { model: Book }, { model: Patron } ] })
      .then((loans) => {
        return res.render('loans', { loans: loans });
      })
      .catch(dataError(req, res, next, 'home'));
});

router.get('/loans', (req, res, next) => {
  if(!req.query.book_id && !req.query.patron_id) { return next(); }
  if(req.params.id == 'new') { return next(); }
  var whereObj = { book_id: req.query.book_id, patron_id: req.query.patron_id };
  var orderObj = [[ 'loaned_on', 'DESC' ]];
  var includeObj = [{ model: Patron }, { model: Book }];
  var queryObj = { where: whereObj, order: orderObj, include: includeObj };
  Loan.findOne(queryObj)
        .then((loan) => {
          loan.returned_on = now();
          return res.render('return_book', { loan: loan, patron: loan.Patron, book: loan.Book });
        })
        .catch(dataError(req, res, next, 'loans'));
});

router.get('/loans/new', (req, res, next) => {
  Book.findAll()
      .then((books) => {
        Patron.findAll()
              .then((patrons) => {
                var newLoan = Loan.build();
                return res.render('new_loan', { loan: newLoan, books: books, patrons: patrons });
              })
              .catch(dataError(req, res, next, 'all_loans'));
      })
      .catch(dataError(req, res, next, 'loans'));
});

router.get('/patrons', (req, res, next) => {
  Patron.findAll()
        .then((patrons) => {
          return res.render('patrons', { patrons: patrons });
        })
        .catch(dataError(req, res, next, 'home'));
});

router.get('/patrons/new', (req, res, next) => {
  return res.render('new_patron', { patron: Patron.build() });
});

router.get('/patrons/:id', (req, res, next) => {
  if(req.params.id == 'new') { return next(); }
  var patronInfo = [{ model: Loan, include: [{ model: Book }] }];
  Patron.findOne({ where: { id: req.params.id }, include: patronInfo })
        .then((patron) => {
          return res.render('patron_detail', { patron: patron, loans: patron.Loans });
        })
        .catch(dataError(req, res, next, 'patrons'));
});


export default router;
