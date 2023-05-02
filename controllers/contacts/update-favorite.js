const Joi = require('joi');
const { ContactModel } = require('../../database/models');
const { createHttpException, mapContactOutput } = require('../../services');

const addSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  const { error } = addSchema.validate({ favorite });
  if (error) {
    throw createHttpException(400, 'missing fields');
  }

  const result = await ContactModel.findByIdAndUpdate(
    contactId,
    {
      favorite,
    },
    { new: true }
  ).catch(error => {
    throw createHttpException(400, error.message);
  });

  if (result === null) {
    throw createHttpException(404, 'Not found');
  }

  const mappedContact = mapContactOutput(result);

  res.status(200).json(mappedContact);
};

module.exports = {
  updateStatusContact,
};
