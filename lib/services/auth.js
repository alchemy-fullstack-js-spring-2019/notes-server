const { ManagementClient } = require('auth0');

const managementClient = new ManagementClient({
  clientId: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
  clientSecret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET,
  domain: process.env.AUTH0_DOMAIN,
  audience: process.env.AUTH0_AUDIENCE,
  scope: 'read:users'
});

// get an individual user by id
const getUser = id => {
  return managementClient.getUser({ id });
};

// get a bulk of users by their ids
const getUsers = ids => {
  return managementClient.getUsers({
    q: `user_id: ${ids.join(' OR ')}`
  });
};

// join users to a model like populate
const joinUsers = async(models, field = 'user') => {
  // get user ids
  const usersId = [...new Set(models.map(model => model[field]))];

  // use auth0 to fetch user profiles in bulk
  const users = await getUsers(usersId);

  // inject user into model
  const modelsWithUsers = models.map(model => ({
    ...model.toJSON(),
    [field]: users.find(user => user.user_id === model[field])
  }));

  // return all models with users populated
  return modelsWithUsers;
};

module.exports = {
  getUser,
  getUsers,
  joinUsers
};
