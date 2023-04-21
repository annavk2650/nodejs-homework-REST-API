const { ContactModel } = require('../../database/models');
const { createHttpException } = require('../../services');

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await ContactModel.findByIdAndDelete(contactId).catch(error => {
    throw createHttpException(error.message, 400);
  });

  if (result === null) {
    throw createHttpException('Not found', 404);
  }

  res.status(200).json({
    message: 'contact deleted',
  });
};

module.exports = {
  deleteById,
};
