const contacts = require('../../models/contacts');
const Joi = require('joi');

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

async function updateById(req, res, next) {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    const { error } = addSchema.validate({ name, email, phone });
    if (error) {
      return res.status(400).json({
        message: 'missing fields',
      });
    }
    const result = await contacts.updateContact(contactId, { name, email, phone });
    if (result === null) {
      return res.status(404).json({
        message: 'Not found',
      });
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  updateById,
};
