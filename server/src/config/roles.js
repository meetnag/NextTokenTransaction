const roles = ['admin', 'manager', 'owner', 'external', 'internal', 'vendor'];

const roleRights = new Map();
roleRights.set(roles[0], ['getUsers', 'manageUsers', 'manageTransfers', 'getTransfers', 'manageCoins', 'getCoins']);
roleRights.set(roles[1], ['getUsers', 'manageUsers', 'manageTransfers', 'getTransfers', 'manageCoins', 'getCoins']);
roleRights.set(roles[2], ['getUsers', 'manageUsers', 'manageTransfers', 'getTransfers', 'manageCoins', 'getCoins']);
roleRights.set(roles[3], ['getUsers', 'manageUsers', 'manageTransfers', 'getTransfers', 'manageCoins', 'getCoins']);
roleRights.set(roles[4], ['getUsers', 'manageUsers', 'manageTransfers', 'getTransfers', 'manageCoins', 'getCoins']);
roleRights.set(roles[5], [
  'getUsers',
  'manageUsers',
  'manageTransfers',
  'getTransfers',
  'manageCoins',
  'getCoins',
  'findTransfers',
]);

module.exports = {
  roles,
  roleRights,
};
