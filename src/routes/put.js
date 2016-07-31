'use strict';

import express from 'express';
import db from '../../models';
import dataError from './dataerror';

var router = express.Router();

var Book = db.Book;
var Loan = db.Loan;
var Patron = db.Patron;

router.put('/books/:id', (req, res, next) => {
  Book.findById(req.params.id)
      .then((book) => {
        return book.update(req.body);
      })
      .then((book) => {
        return res.redirect(`/library/books/${book.id}`);
      })
      .catch(dataError(req, res, next, 'book_detail'));
});

router.put('/patrons/:id', (req, res, next) => {
  Patron.findById(req.params.id)
        .then((patron) => {
          return patron.update(req.body);
        })
        .then((patron) => {
          return res.redirect(`/library/patrons/${patron.id}`);
        })
        .catch(dataError(req, res, next, 'patron_detail'));
});

router.put('/loans', (req, res, next) => {
  var whereObj = { book_id: req.query.book_id, patron_id: req.query.patron_id };
  var orderObj = [[ 'loaned_on', 'DESC' ]];
  var queryObj = { where: whereObj, order: orderObj };
  Loan.findOne(queryObj)
      .then((loan) => {
        return loan.update(req.body);
      })
      .then((loan) => {
        res.redirect(`/library/loans`);
      })
      .catch(dataError(req, res, next, 'loans'));
});

export default router;
