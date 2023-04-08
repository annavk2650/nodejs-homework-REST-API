const express = require('express');
const contactContloller = require('../../controllers/contacts');
const router = express.Router();

router.get('/', contactContloller.getAll);

router.get('/:contactId', contactContloller.getById);

router.post('/', contactContloller.addContacts);

router.delete('/:contactId', contactContloller.deleteById);

router.put('/:contactId', contactContloller.updateById);

module.exports = router;
