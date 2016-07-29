'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _get = require('./get');

var _get2 = _interopRequireDefault(_get);

var _post = require('./post');

var _post2 = _interopRequireDefault(_post);

var _put = require('./put');

var _put2 = _interopRequireDefault(_put);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use('/', _get2.default);
router.use('/', _put2.default);
router.use('/', _post2.default);

exports.default = router;