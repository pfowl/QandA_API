const { client } = require('./db');

// MODELS get data from the database as is
module.exports = {
  getQA: async (PId) => {
    console.log('This should get the Q data from the database');
    const res = await client.query(`SELECT json_build_object(
      'product_id', ${PId},
      'results', (
        SELECT json_agg(json_build_object(
          'question_id', q.id,
          'question_body', q.body,
          'question_date', q.date_written,
          'asker_name', q.asker_name,
          'question_helpfulness', q.helpful,
          'reported', q.reported,
          'answers', (
            SELECT COALESCE(jsonb_object_agg(
              a.id, (
                SELECT json_build_object(
                  'id', a.id,
                  'body', a.body,
                  'date', a.date_written,
                  'answerer_name', a.answerer_name,
                  'helpfulness', a.helpful,
                  'photos', (
                    SELECT coalesce(json_agg(json_build_object(
                      'id', ap.id,
                      'url', ap.url
                    )), '[]')
                    FROM answers_photos ap WHERE ap.answer_id=a.id
                  )
                )
              )
            ), '{}')
            FROM answers a WHERE a.question_id=q.id
          )
        ))
        FROM questions q WHERE q.product_id=${PId}
      )
    )`);
    return res.rows;
  },
  getAnswers: async (QId) => {
    console.log('This should get the A data from the database');
    const res = await client.query(`SELECT json_build_object(
      'question', ${QId},
      'page', 'PENDING',
      'count', 'PENDING',
      'results', (
        SELECT json_agg(json_build_object(
          'answer_id', a.id,
          'body', a.body,
          'date', a.date_written,
          'answerer_name', a.answerer_name,
          'helpfulness', a.helpful,
          'photos', (
            SELECT coalesce(json_agg(json_build_object(
              'id', ap.id,
              'url', ap.url
            )), '[]')
            FROM answers_photos ap WHERE ap.answer_id=a.id
          )
        ))
        FROM answers a WHERE a.question_id=${QId}
      )
    )`);
    return res.rows;
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
