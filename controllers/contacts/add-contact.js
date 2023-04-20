const Joi = require('joi');
const { ContactModel } = require('../../database/models');
const { createHttpException, mapContactOutput } = require('../../services');

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

async function addContacts(req, res, next) {
  const user = req.user;
  const { name, email, phone, favorite } = req.body;

  const { error } = addSchema.validate({ name, email, phone, favorite });
  if (error) {
    throw createHttpException(400, 'missing required name field');
  }

  const result = await ContactModel.create({ name, email, phone, favorite, owner: user });

  const mappedContact = mapContactOutput(result);

  res.status(201).json(mappedContact);
}

module.exports = {
  addContacts,
};
