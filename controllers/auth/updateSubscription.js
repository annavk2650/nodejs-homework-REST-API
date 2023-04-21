const Joi = require('joi');
const { UserModel } = require('../../database/models');
const { createHttpException, mapContactOutput } = require('../../services');
const { USER_RULE } = require('../../enums');

const addSchema = Joi.object({
  subscription: Joi.string()
    .default(USER_RULE.STARTER)
    .valid(...Object.values(USER_RULE)),
});

const updateSubscription = async (req, res, next) => {
  const { id } = req.params;
  const { subscription } = req.body;

  const { error } = addSchema.validate({ subscription });
  if (error) {
    return res.status(400).json(error.message);
  }

  const result = await UserModel.findByIdAndUpdate(id, { subscription }, { new: true }).catch(
    error => {
      throw createHttpException(400, error.message);
    }
  );

  if (result === null) {
    throw createHttpException(404, 'Not found');
  }

  const mappedContact = mapContactOutput(result);
  res.json(mappedContact);
};

module.exports = {
  updateSubscription,
};
