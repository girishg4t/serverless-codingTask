'use strict';

const Joi = require('joi');

function Task(opts) {
    const validationError = Joi.validate(opts, {
        id: Joi.string().required(),
        name: Joi.string().required(),
        slug: Joi.string()
    }).error;

    if(validationError !== null) {
        throw validationError;
    }

    Object.assign(this, opts);
}

module.exports = Task;