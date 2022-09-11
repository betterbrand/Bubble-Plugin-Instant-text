const express = require('express')

const axios = require("axios");

const app = express();

app.listen(3000, function() {
    console.log("Server is listening on port 3000...");
});

app.post('/graphql', (req, res)=> {


    console.log(req);

    const url = req.url;

    const token = req.token;

    const name = req.name;

    const type = req.type;

    const queryValues = req.queryValues;

    const headers = {
        "content-type" : "application/json",
        "Authorization" : token
    }

    const graphqlQuery = {
        "operationName": name,
        "query": `${type} ${name} { ${queryValues} }`,
        "variables": {}
    };

    res = axios({
        url: url,
        method: 'post',
        headers: headers,
        data: graphqlQuery
      });
      
    console.log(res);

    return res;

})