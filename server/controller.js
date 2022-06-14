const models = require('./models');

// CONTROLLERS change data into the right shape to give back to the view
module.exports = {
  transformQuestions: async (req, res) => {
    const dataRes = await models.getQA(req.params.PId);
    console.log('This should turn data into the right shape', req.params);
    res.status(200).send(dataRes[0].json_build_object);
  },
  transformAnswers: async (req, res) => {
    const dataRes = await models.getAnswers(req.params.QId, req.query.page, req.query.count);
    console.log('This should turn answer data into the right shape', req.params);
    res.status(200).send(dataRes[0].json_build_object);
  },
  transformQuestionPost: (req, res) => {
    models.postQuestion(req.params, {
      body: req.body.body,
      name: req.body.name,
      email: req.body.email,
    })
      .then((dataRes) => {
        console.log('This should POST question data into the right shape', req.params);
        res.status(201).send(dataRes);
      })
      .catch((err) => {
        console.log('Error posting question:', err);
        res.status(404).send(err);
      });
  },
  transformAnswerPost: (req, res) => {
    const date = new Date().toISOString();
    models.postAnswer(req.params, {
      body: req.body.body,
      name: req.body.name,
      email: req.body.email,
      date,
    })
      .then((answerRes) => {
        models.postPhotos(req.params, req.body.photos, date)
          .then(() => {
            console.log('This should POST answer data in the right shape', req.params);
            res.status(201);
          })
          .catch((err) => {
            console.log('Error posting answer photos:', err);
            res.status(404).send(err);
          });
        res.status(201).send(answerRes);
      })
      .catch((err) => {
        console.log('Error posting answer:', err);
        res.status(404).send(err);
      });
  },
};
