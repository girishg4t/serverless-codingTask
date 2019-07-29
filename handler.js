'use strict';

const AWS = require("aws-sdk");
const response = require('./util/response');
const TaskService = require('./services/taskService');
const Task = require('./models/task');

const taskService = new TaskService();

module.exports = {
    handler,
    processItem
}

async function handler(event, context, callback) {
    try {
        const obj = JSON.parse(event.body);
        const task = new Task(obj);
        const result = await taskService.createTask(task);
        callback(null, response.ok({ data: result }));
    } catch (err) {
        callback(err, response.serverError(err));
    }
};


async function processItem(event, context, callback) {
    try {
        const record = event.Records[0];
        if (record && record.eventName == 'INSERT') {
            var obj = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.NewImage);
            const task = new Task(obj);
            const result = await taskService.updateTask(task);
            callback(null, response.ok({ data: result }));
        } else {
            callback(null, response.forbidden({ error: `${record.eventName} not allowed` }));
        }


    } catch (err) {
        callback(err, response.serverError(err));
    }
};
