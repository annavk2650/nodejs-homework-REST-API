const Joi = require('joi');
const { ContactModel } = require('../../database/models');
const { createHttpException, mapContactOutput } = require('../../services');

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone, favorite } = req.body;

  const { error } = addSchema.validate({ name, email, phone, favorite });
  if (error) {
    throw createHttpException('missing fields', 400);
  }
  const result = await ContactModel.findByIdAndUpdate(
    contactId,
    {
      name,
      email,
      phone,
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
  updateById,
};
