'use strict';

import express from 'express';
import path from 'path';
var router = express.Router();

import get from './get';
import post from './post';
import put from './put';

router.use('/', get);
router.use('/', put);
router.use('/', post);


export default router;
