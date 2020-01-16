const express = require('express');
const router = express.Router();

// Subrouters;
const studentsRouter = require('./students');
const campusesRouter = require('./campuses');

// Mount our subrouters to assemble our apiRouter;
router.use('/students', studentsRouter);
router.use('/campuses', campusesRouter);

// Error handling middleware;
router.use((req, res, next) => {
  const error = new Error("Not Found, Please Check URL!");
  error.status = 404;
  next(error);
});

// Export our apiRouter, so that it can be used by our main app in app.js;
module.exports = router;
