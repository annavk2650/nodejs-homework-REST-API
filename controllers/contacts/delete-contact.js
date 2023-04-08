const contacts = require('../../models/contacts');

async function deleteById(req, res, next) {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (result === null) {
      return res.status(404).json({
        message: 'Not found',
      });
    }
    res.status(200).json({
      message: 'contact deleted',
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  deleteById,
};
