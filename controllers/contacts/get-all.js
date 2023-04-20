const { ContactModel } = require('../../database/models');
const { mapContactOutput } = require('../../services');

async function getAll(req, res, next) {
  const { _id: owner } = req.user;

  const { page, limit, favorite } = req.query;

  let searchCriteries = { owner };

  if (favorite) {
    searchCriteries.favorite = favorite;
  }

  const contacts = await ContactModel.find(searchCriteries, null, {
    skip: (page - 1) * limit,
    limit,
  }).populate('owner', 'email subscription');

  const mappedContacts = contacts.map(mapContactOutput);

  res.status(200).json(mappedContacts);
}

module.exports = {
  getAll,
};
