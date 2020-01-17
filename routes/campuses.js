const express = require('express');
const router = express.Router();
const { Campus, Student } = require('../database/models');

router.get('/', function(req, res, next) {
  Campus.findAll({ include: [Student] })
    .then(campuses => res.json(campuses))
    .catch(err => console.log(err))
});

router.get('/:id', function(req, res, next){
    Campus.findByPk(req.params.id)
    .then(campus => res.json(campus))
    .catch(next)
});

router.post('/', async function(req, res, next){
    try{
      // console.log(req.query);
      let campus = await Campus.create(req.query);
      res.status(201).json (campus);
    }
    catch (err){
      next(err);
    }
  });

router.put('/:id', async (req, res, next) =>{
  try{
    // console.log(req);
    let updatedCampusInfo = await Campus.update(req.query, {
      where: { id: req.params.id },
      returning: true,
      plain: true
    });
    res.status(200).json(updatedCampusInfo);
  }
  catch (err){
    next(err);
  }
});

router.delete('/:id', async (req, res, next) =>{
    try{
      const deleteCampus = await Campus.destroy({
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
