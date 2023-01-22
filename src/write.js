var AWS = require("aws-sdk");
let awsConfig = {
    "region": "us-east-2",
    "endpoint": "http://dynamodb.us-east-2.amazonaws.com",
    "accessKeyId": "AKIATWHP2O5ZIHUYX4RT", "secretAccessKey": "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"
};
AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();

let save = function (input) {

    
    var params = {
        TableName: "FoodForThoughtDB",
        Item:  input
    };
    docClient.put(params, function (err, data) {

        if (err) {
            console.log("users::save::error - " + JSON.stringify(err, null, 2));                      
        } else {
            console.log("users::save::success" );                      
        }
    });
}
export default save();

        