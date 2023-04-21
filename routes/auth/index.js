const express = require('express');
const authController = require('../../controllers/auth');
const { controllerWrapper } = require('../../services');
const { userAuthMiddleware } = require('../../middlewares');

const router = express.Router();

router.post('/register', controllerWrapper(authController.register));

router.post('/login', controllerWrapper(authController.login));

router.post('/logout', userAuthMiddleware, controllerWrapper(authController.logout));

router.get('/current', userAuthMiddleware, controllerWrapper(authController.getCurrent));

router.patch('/:id', userAuthMiddleware, controllerWrapper(authController.updateSubscription));
module.exports = router;
