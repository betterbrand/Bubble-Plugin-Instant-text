const express = require('express')

const axios = require("axios");

const app = express();

const { UrlLoader } = require('@graphql-tools/url-loader')

const { loadSchema } = require('@graphql-tools/load')

app.listen(3000, function() {
    console.log("Server is listening on port 3000...");
});

app.post('/graphql', (req, res)=> {

    try {
        console.log(req);

    const url = req.url;

    const token = req.token;

    const name = req.name;

    const type = req.type;

    const queryValues = req.queryValues;

    const headers = {
        "content-type" : "application/json"
    }

    const graphqlQuery = {
        "operationName": name,
        "query": `${type} ${name} { ${queryValues} }`,
        "variables": {}
    };

    axios({
        
        url: url,
        method: 'post',
        headers: headers,
        data: graphqlQuery
      }).then((result) => {
        console.log(result.data)
        return res.status(200).json(result.data);
      })
    } catch(error) {
        return res.status(500).json({
            'error' : error
        })
    }
    

   

})

app.post('/loadSchema', async (req, res)  => {

    try {
        console.log(req);

        const url = req.url;
    
        const schema = await loadSchema(url, {
        loaders: [new UrlLoader()]
      })
    
    return res.status(200).json(
            {
                'schema' : schema
            }
        );
    } catch(error) {
        return res.status(500).json({
            'error' : error
        })
    }
   
})