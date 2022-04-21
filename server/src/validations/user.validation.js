const Joi = require('@hapi/joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().allow(null, '').email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    is_email_verified: Joi.bool().required(),
    role: Joi.string().required().valid('user', 'admin', 'teacher'),
  }),
};

const getAllUsers = {
  query: Joi.object().keys({}),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().allow(null, '').email(),
      name: Joi.string().allow(null, ''),
      role: Joi.string().allow(null, ''),
      password: Joi.allow(null, '').custom(password),
      manager: Joi.string().allow(null, ''),
      user: Joi.string().allow(null, ''),
    })
    .min(1),
};

const updatePassword = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      old_password: Joi.string().required().custom(password),
      confirm_password: Joi.required().custom(password),
      password: Joi.required().custom(password),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getAllUsers,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  updatePassword,
};
