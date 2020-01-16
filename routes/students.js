const express = require('express');
const router = express.Router();
const { Student } = require('../database/models');

router.get('/', function(req, res, next) {
  Student.findAll()
    .then(students => res.json(students))
    .catch(err => console.log(err))
});

router.get('/:id', function(req, res, next){
  Student.findByPk(req.params.id)
  .then(student => res.json(student))
  .catch(next)
});

router.post('/', async function(req, res, next){
  try{
    // console.log(req.query);
    let student = await Student.create(req.query);
    res.status(201).json (student);
  }
  catch (err){
    next(err);
  }
});

router.put('/:id', async (req, res, next) =>{
  try{
    // console.log(req);
    let updatedStudentInfo = await Student.update(req.query, {
      where: { id: req.params.id },
      returning: true,
      plain: true
    });
    res.status(200).json(updatedStudentInfo);
  }
  catch (err){
    next(err);
  }
});

router.delete('/:id', async (req, res, next) =>{
  try{
    const deleteStudent = await Student.destroy({
      where: { id: req.params.id },
      plain: true
    });
    res.sendStatus(204);
  }
  catch(err){
    next(err);
  }
});

// Export our router, so that it can be imported to construct our apiRouter;
module.exports = router;
