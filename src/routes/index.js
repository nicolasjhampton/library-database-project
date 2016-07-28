'use strict';

import express from 'express';
import path from 'path';
var router = express.Router();

import get from './get';
router.use('/', get);

export default router;
