const { Client } = require('pg');
require('dotenv').config();

const csv = require('csv-parser');
const fs = require('fs');

const client = new Client({
  user: 'postgres',
  host: '35.173.178.167',
  database: 'test',
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

// CONNECTING TO DB
client.connect();

// EXTRACT & LOAD procedure completed through the terminal using data from CSV files in data folder

// EXAMPLE FUNCTION: getting all rows from test table
const getSomething = async () => {
  const res = await client.query('SELECT * FROM testtab');
  console.log(res);
  //await client.end();
};

// EXAMPLE FUNCTION: inserting something into test table
const insertSomething = async () => {
  const res = await client.query(`INSERT INTO testtab("id", "username") VALUES(457, 'val')`);
  console.log(res);
};

//getSomething();
//insertSomething();
// const endConnection = async () => {
//   await client.end();
// };

// client.end();

// select json_build_object()

module.exports = { client };
