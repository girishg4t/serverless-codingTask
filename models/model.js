'use strict';

const Joi = require('joi');

function Model(opts) {
    const validationError = Joi.validate(opts, {
        id: Joi.string().required(),
        name: Joi.string().required()
    }).error;

    if(validationError !== null) {
        throw validationError;
    }

    Object.assign(this, opts);
}

module.exports = Model;