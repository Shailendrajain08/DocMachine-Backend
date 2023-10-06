const express = require('express');
const  dashboardController= require('./dashboard.controller');
const router = express.Router();

router
  .route('/')
  .get(dashboardController.getDashboardData)
  router


module.exports = router;