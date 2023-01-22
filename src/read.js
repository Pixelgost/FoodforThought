var AWS = require("aws-sdk");
let awsConfig = {
    "region": "us-east-2",
    "endpoint": "http://dynamodb.us-east-2.amazonaws.com",
    "accessKeyId": "AKIATWHP2O5ZIHUYX4RT", "secretAccessKey": "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"
};
AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();
let fetchOneByKey = function (params) {
    
    docClient.get(params, function (err, data) {
        return(JSON.stringify(data, null, 2));
    })
}
export default fetchOneByKey();
