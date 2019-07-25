'use strict';

const config = require('./config/config');
const response = require('./util/response');

const Service = require('./services/service');

const service = new Service();

module.exports = {
    handler,
    processItem
}

async function handler(event, context, callback) {
    try {
        const task = JSON.parse(event.body);
        const result = await service.doSomething(task);

        return response.ok({ data: result });
    } catch(err) {
        callback(err, response.serverError(err));
    }
};


async function processItem(event, context, callback) {
    try {
        console.log('[new dynamodb event received] :=> ', JSON.stringify(event));
        const task = JSON.parse(event.body);
        console.log(task);
        callback(null, response.ok({ data: task }));
    } catch(err) {
        callback(err, response.serverError(err));
    }
};
