'use strict';

const Model = require('../models/model');
const dynamodb = require('serverless-dynamodb-client');

function Service(opts) {
    Object.assign(this, opts);
}

module.exports = Service;

Service.prototype = {
    createTask,
    updateTask
};

function createTask(obj) {
    const db = dynamodb.doc;
    const task = new Model(obj);
    var params = {
        TableName: 'Tasks',
        Item: {
            "id": task.id,
            "name": task.name
        }
    }
    return db.put(params).promise();
}

function updateTask(event) {
    const record = event.Records[0];
    if (record && record.eventName == 'INSERT') {

        var data = record.dynamodb.NewImage
        // validation
        if (typeof data.name.S !== 'string') {
            console.error('Validation Failed');
            return Promise.reject({
                statusCode: 400,
                headers: { 'Content-Type': 'text/plain' },
                body: 'Couldn\'t update the task item.',
            });
        }

        const params =
        {
            TableName: "Tasks",
            Key: {
                "id": data.id.S,
                "name": data.name.S
            },
            UpdateExpression: "set slug = :y",
            ExpressionAttributeValues: {
                ":y": data.name.S.split(" ").join("-")
            },
            ReturnValues: "UPDATED_NEW"
        }

        const db = dynamodb.doc;
        return db.update(params).promise();
    }
    return Promise.resolve();
}
