const { Client } = require('pg');
require('dotenv').config();

const csv = require('csv-parser');
const fs = require('fs');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'test',
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

// EXTRACT & LOAD procedure completed through the terminal using data from CSV files in data folder
client.connect();
// const connectToDB = async () => {
//   await client.connect();
// };

const getSomething = async () => {
  const res = await client.query('SELECT * FROM testtab');
  console.log(res);
  await client.end();
};

const insertSomething = async () => {
  const res = await client.query(`INSERT INTO testtab("id", "username") VALUES(457, 'val')`);
  console.log(res);
};

const insertTestAnswers = async () => {
  var result = [];
  fs.createReadStream('./data/answers.csv')
    .pipe(csv({}))
    .on('data', (data) => result.push(data))
    .on('end', () => {
      var tr = result[0];
      console.log(tr);
      client.query(`INSERT INTO answers("id", "question_id") VALUES(${tr.id}, ${tr.question_id})`);
      console.log('done');
    });
  //console.log(res);
};
//, "question_id", "body", "date_written", "answerer_name", "answerer_email", "reported", "helpful"
const endConnection = async () => {
  await client.end();
};

const insertReal = async () => {
  console.log(`\\copy`);
  client.query(`\\copy answers(id,question_id,body,date_written,answerer_name,answerer_email,reported,helpful) FROM '/Users/valpizzo/Desktop/SDC Project/QandA_API/data/answers.csv' DELIMITER ',' CSV HEADER`);
};
// connectToDB();
//insertTestAnswers();
insertReal();
//insertSomething();
//getSomething();
//endConnection();



//select json_build_object()
