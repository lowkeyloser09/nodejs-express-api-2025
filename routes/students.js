var express = require('express');
var router = express.Router();
const Studentservice = require('../services/student.service');

router.get('/all', Studentservice.getAll);
router.post('/', Studentservice.add);
router.get('/:id', Studentservice.getOne);
router.delete('/:id', Studentservice.delete);
router.put('/:id', Studentservice.update);

module.exports = router;