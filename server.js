const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const neo4j = require('neo4j-driver')

const port = 5000
const uri = 'bolt://localhost'
//Middleware//
app.use(bodyParser.json());
//Middleware//

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Neo4j server listening at http://localhost:${port}`)
})