const Joi = require('joi');

module.exports = {
  page: Joi.number().integer().min(1).max(1000)
};
