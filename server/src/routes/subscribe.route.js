const express = require('express');
const subscibeRouter = express.Router();
const { addSubscriber, getAllSubscribers } = require('../controllers/subscibe.controller');

subscibeRouter.post('/subscribe', addSubscriber);     
subscibeRouter.get('/subscribers', getAllSubscribers); 

module.exports = subscibeRouter;
