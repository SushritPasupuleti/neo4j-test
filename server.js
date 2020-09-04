require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const neo4j = require('neo4j-driver')

const port = 5000
const uri = process.env.URL
const user = process.env.USER
const password = process.env.PASSWORD
//Middleware//
app.use(bodyParser.json());
//Middleware//

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password))
const session = driver.session()

app.get('/', (req, res) => {

  session.run(
    'MATCH (n) RETURN n LIMIT 25'
  ).then((result) => {
    result.records.forEach((record) => {
      console.log(record._fields[0].properties)
    })
  }).catch((err) => {
    console.log("error", err);
    res.send("Error")
  });

  res.send('Neo4j connection status: active')
})

app.get('/avengers', (req, res) => {

  var avengers = []
  session.run(
    'MATCH (a:Person)-[r:MemberOf]->(b:Group {name: "Avengers"}) RETURN a'
  ).then((result) => {
    result.records.forEach((record) => {
      console.log(record._fields[0].properties)
      avengers.push(record._fields[0].properties.name)
    })
    console.log("Avengers: ", avengers)
    res.send('Avengers: ' + avengers)

  }).catch((err) => {
    console.log("error", err);
    res.send("Error")
  });
})


app.listen(port, () => {
  console.log(`Neo4j server listening at http://localhost:${port}`)
})