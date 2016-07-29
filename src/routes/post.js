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
    res.redirect(`/library/books/${book.id}`);
  });
});

router.post('/patrons', (req, res, next) => {
  if(req.params._method == 'PUT') { return next(); }
  Patron.create(req.body).then((patron) => {
    res.redirect(`/library/patrons/${patron.id}`);
  }).catch(dataError(res));
});

router.post('/loans', (req, res, next) => {
  if(req.params._method == 'PUT') { return next(); }
  Loan.create(req.body).then((loan) => {
    res.redirect(`/library/patrons/${loan.patron_id}`);
  });
});

export default router;
