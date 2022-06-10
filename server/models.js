const { client } = require('./db');

module.exports = {
  getQA: async (PId) => {
    console.log('This should get the Q data from the database');
    const res = await client.query(`SELECT * FROM questions where product_id=${PId}`);
    console.log(res.rows);
  },
  getAnswers: async (QId) => {
    console.log('This should get the A data from the database');
    const res = await client.query(`SELECT * FROM answers where question_id=${QId}`);
    console.log(res.rows);
  },
  postQuestion: async (questionObj) => {
    console.log('This should POST a new question to the database');
  },
  postAnswer: async (answerObj) => {
    console.log('This should POST a new answer to a question to the databse');
  },
  postPhotos: async(photoObj) => {
    console.log('This should POST new photos to answers_photos database');
  },
};
