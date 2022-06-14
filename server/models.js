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
  getAnswers: async (QId, page = 1, count = 5) => {
    console.log('This should get the A data from the database');
    const res = await client.query(`SELECT json_build_object(
      'question', ${QId},
      'page', ${page},
      'count', ${count},
      'results', (
        SELECT COALESCE (json_agg(json_build_object(
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
        )), '[]')
        FROM answers a WHERE a.question_id=${QId}

      )
    )`);
    return res.rows;
  },
  postQuestion: async (id, q) => {
    console.log('This should POST a new question to the database');
    const date = new Date().toISOString();
    const res = await client.query(`INSERT INTO questions
      (
        "product_id",
        "body",
        "date_written",
        "asker_name",
        "asker_email",
        "reported",
        "helpful"
      )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        0,
        0
      )`, [id.PId, q.body, date, q.name, q.email]);
    return res;
  },
  postAnswer: async (id, a) => {
    console.log('This should POST a new answer to a question to the databse');
    const res = await client.query(`INSERT INTO answers
      (
        "question_id",
        "body",
        "date_written",
        "answerer_name",
        "answerer_email",
        "reported",
        "helpful"
      )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        0,
        0
      )`, [id.QId, a.body, a.date, a.name, a.email]);
    return res;
  },
  postPhotos: async (QId, pArray, date) => {
    console.log('This should POST new photos to answers_photos database', date);
    const answerId = await client.query(`SELECT id FROM answers a WHERE a.question_id=${QId.QId} AND a.date_written='${date}'`);
    await pArray.forEach((photo) => {
      client.query(`INSERT INTO answers_photos
        (
          "answer_id",
          "url"
        )
        VALUES (
          $1,
          $2
        )`, [answerId.rows[0].id, photo]);
    });
    return 'Photos posted';
  },
};
