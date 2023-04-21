const { ContactModel } = require('../../database/models');
const { createHttpException, mapContactOutput } = require('../../services');

const getById = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await ContactModel.findById(contactId).catch(error => {
    throw createHttpException(error.message, 400);
  });

  if (!result) {
    throw createHttpException(404, 'Not found');
  }

  const mappedContact = mapContactOutput(result);

  res.status(200).json(mappedContact);
};

module.exports = {
  getById,
};
