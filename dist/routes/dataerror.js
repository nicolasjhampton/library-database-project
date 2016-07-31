"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (req, res, next, render) {
  return function (err) {
    res.locals.book = /books/.test(req.url) ? req.body : undefined;
    res.locals.loan = /loans/.test(req.url) ? req.body : undefined;
    res.locals.patron = /patrons/.test(req.url) ? req.body : undefined;
    res.locals.render = render;
    res.locals.errors = err.errors;
    err.status = 500;
    console.log(err);
    return next(err);
  };
};