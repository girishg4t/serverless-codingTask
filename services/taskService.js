'use strict';

const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();

function TaskService(opts) {
    Object.assign(this, opts);
}

module.exports = TaskService;

TaskService.prototype = {
    createTask,
    updateTask
};

function createTask(task) {
    var params = {
        TableName: 'Tasks',
        Item: {
            "id": task.id,
            "name": task.name
        }
    }
    return dynamodb.put(params).promise();
}

function updateTask(task) {
    const params =
    {
        TableName: "Tasks",
        Key: {
            "id": task.id,
            "name": task.name
        },
        UpdateExpression: "set slug = :y",
        ExpressionAttributeValues: {
            ":y": task.name.split(" ").join("-")
        },
        ReturnValues: "UPDATED_NEW"
    }

    return dynamodb.update(params).promise();
}
