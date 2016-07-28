"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (res) {
  return function (err) {
    res.send(err.message);
  };
};