'use strict';

const Model = require('../models/model');
const dynamodb = require('serverless-dynamodb-client');

function Service(opts) {
    Object.assign(this, opts);
}

module.exports = Service;

Service.prototype = {
    doSomething
};

// function doSomething(task) {
//     const db = dynamodb.doc;
//     var params = {
//         TableName: 'TaskGallery',
//         KeyConditionExpression: "#id = :idValue",
//         ExpressionAttributeNames: {
//             "#id": "id"
//         },
//         ExpressionAttributeValues: {
//             ":idValue": task.id
//         }
//     };
//     return db.put(params).promise().then(data => {       
//         console.log(JSON.stringify(data));
//         return data;
//     });

//     return db.query(params).promise().then(data => {
//       console.log(JSON.stringify(data));
//         return data;
//     });
// }

function doSomething(task) {
    const db = dynamodb.doc;
    var params = {
        TableName: 'TaskGallery',
        Item: {
            "id": task.id,
            "name": task.name
        }
    }
    return db.put(params).promise();
}