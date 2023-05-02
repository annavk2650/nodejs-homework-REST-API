const { ContactModel } = require('../../database/models');
const { createHttpException } = require('../../services');

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await ContactModel.findByIdAndDelete(contactId).catch(error => {
    throw createHttpException(400, error.message);
  });

  if (result === null) {
    throw createHttpException(404, 'Not found');
  }

  res.status(200).json({
    message: 'contact deleted',
  });
};

module.exports = {
  deleteById,
};
