const roles = ['admin', 'manager', 'owner', 'external', 'internal', 'vendor', 'lender', 'invbuyer'];

const roleRights = new Map();
roleRights.set(roles[0], [
  'getUsers',
  'manageUsers',
  'manageTransfers',
  'getTransfers',
  'manageCoins',
  'getCoins',
  'getInvoice',
  'uploadeDocument',
]);
roleRights.set(roles[1], [
  'getUsers',
  'manageUsers',
  'manageTransfers',
  'getTransfers',
  'manageCoins',
  'getCoins',
  'getInvoice',
  'uploadeDocument',
]);
roleRights.set(roles[2], [
  'getUsers',
  'manageUsers',
  'manageTransfers',
  'getTransfers',
  'manageCoins',
  'getCoins',
  'getInvoice',
  'uploadeDocument',
]);
roleRights.set(roles[3], [
  'getUsers',
  'manageUsers',
  'manageTransfers',
  'getTransfers',
  'manageCoins',
  'getCoins',
  'getInvoice',
  'uploadeDocument',
]);
roleRights.set(roles[4], [
  'getUsers',
  'manageUsers',
  'manageTransfers',
  'getTransfers',
  'manageCoins',
  'getCoins',
  'getInvoice',
  'uploadeDocument',
]);
roleRights.set(roles[5], [
  'getUsers',
  'manageUsers',
  'manageTransfers',
  'getTransfers',
  'manageCoins',
  'getCoins',
  'findTransfers',
  'uploadeDocument',
]);
roleRights.set(roles[6], [
  'getUsers',
  'manageUsers',
  'manageTransfers',
  'getTransfers',
  'manageCoins',
  'getCoins',
  'findTransfers',
  'uploadeDocument',
]);
roleRights.set(roles[7], [
  'getUsers',
  'manageUsers',
  'manageTransfers',
  'getTransfers',
  'manageCoins',
  'getCoins',
  'findTransfers',
  'uploadeDocument',
]);

module.exports = {
  roles,
  roleRights,
};
