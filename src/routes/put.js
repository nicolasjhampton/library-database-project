'use strict';

import express from 'express';
import db from '../../models';
import dataError from './dataerror';

var router = express.Router();

var Book = db.Book;
var Loan = db.Loan;
var Patron = db.Patron;

router.post('/books/:id', (req, res, next) => {
  Book.findById(req.params.id).then((book) => {
    return book.update(req.body);
  })
  .then((book) => {
    res.redirect(`/library/books/${book.id}`);
  })
  .catch(dataError(res));
});

router.post('/patrons/:id', (req, res, next) => {
  Patron.findById(req.params.id).then((patron) => {
    return patron.update(req.body);
  })
  .then((patron) => {
    res.redirect(`/library/patrons/${patron.id}`);
  })
  .catch(dataError(res));
});

// router.put('/loans/:id', (req, res, next) => {
//   Loan.findOne(req.body).then((loan) => {
//     res.redirect(`/library/patrons/${loan.patron_id}`);
//   });
// });

export default router;
