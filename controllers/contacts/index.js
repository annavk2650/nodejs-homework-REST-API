const { getAll } = require('./get-all');
const { getById } = require('./get-by-id');
const { addContacts } = require('./add-contact');
const { updateById } = require('./update-contact');
const { deleteById } = require('./delete-contact');

module.exports = {
  getAll,
  getById,
  addContacts,
  updateById,
  deleteById,
};
