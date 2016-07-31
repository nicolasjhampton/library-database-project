'use strict';

import express from 'express';
import db from '../../models';
import dataError from './dataerror';

var router = express.Router();

var Book = db.Book;
var Loan = db.Loan;
var Patron = db.Patron;

router.post('/books', (req, res, next) => {
  if(req.params._method == 'PUT') { return next(); }
  Book.create(req.body).then((book) => {
    return res.redirect(`/library/books/${book.id}`);
  })
  .catch(dataError(req, res, next, 'new_book'));
});

router.post('/patrons', (req, res, next) => {
  if(req.params._method == 'PUT') { return next(); }
  Patron.create(req.body).then((patron) => {
    return res.redirect(`/library/patrons/${patron.id}`);
  })
  .catch(dataError(req, res, next, 'new_patron'));
});

router.post('/loans', (req, res, next) => {
  if(req.params._method == 'PUT') { return next(); }
  Loan.create(req.body).then((loan) => {
    return res.redirect(`/library/patrons/${loan.patron_id}`);
  })
  .catch(dataError(req, res, next, 'loans'));
});

export default router;
