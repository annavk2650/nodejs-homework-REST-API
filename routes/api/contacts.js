const express = require('express');
const contactContloller = require('../../controllers/contacts');
const { userAuthMiddleware } = require('../../middlewares');
const { controllerWrapper } = require('../../services');

const router = express.Router();

router.get('/', userAuthMiddleware, controllerWrapper(contactContloller.getAll));

router.get('/:contactId', userAuthMiddleware, controllerWrapper(contactContloller.getById));

router.post('/', userAuthMiddleware, controllerWrapper(contactContloller.addContacts));

router.delete('/:contactId', userAuthMiddleware, controllerWrapper(contactContloller.deleteById));

router.put('/:contactId', userAuthMiddleware, controllerWrapper(contactContloller.updateById));

router.patch(
  '/:contactId/favorite',
  userAuthMiddleware,
  controllerWrapper(contactContloller.updateStatusContact)
);

module.exports = router;
