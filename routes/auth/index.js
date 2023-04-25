const express = require('express');
const authController = require('../../controllers/auth');
const { controllerWrapper } = require('../../services');
const { userAuthMiddleware, upload } = require('../../middlewares');

const router = express.Router();

router.post('/register', controllerWrapper(authController.register));

router.post('/login', controllerWrapper(authController.login));

router.post('/logout', userAuthMiddleware, controllerWrapper(authController.logout));

router.get('/current', userAuthMiddleware, controllerWrapper(authController.getCurrent));

router.patch('/', userAuthMiddleware, controllerWrapper(authController.updateSubscription));

router.patch(
  '/avatars',
  userAuthMiddleware,
  upload.single('avatar'),
  controllerWrapper(authController.updateAvatar)
);

module.exports = router;
