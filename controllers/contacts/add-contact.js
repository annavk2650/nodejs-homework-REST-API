const contacts = require('../../models/contacts');
const Joi = require('joi');

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

async function addContacts(req, res, next) {
  try {
    const { name, email, phone } = req.body;
    const { error } = addSchema.validate({ name, email, phone });
    if (error) {
      return res.status(400).json({
        message: 'missing required name field',
      });
    }
    const result = await contacts.addContact(name, email, phone);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  addContacts,
};
