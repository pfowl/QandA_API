const models = require('./models');

// CONTROLLERS change data into the right shape to give back to the view
module.exports = {
  transformQuestions: async (req, res) => {
    const dataRes = await models.getQA(req.params.PId);
    console.log('This should turn data into the right shape', req.params);
    res.status(200).send(dataRes[0].json_build_object);
  },
  transformAnswers: async (req, res) => {
    const dataRes = await models.getAnswers(req.params.QId);
    console.log('This should turn answer data into the right shape', req.params);
    res.status(200).send(dataRes);
  },
  transformQuestionPost: (req, res) => {
    models.postQuestion({ body: req.body.body, name: req.body.name, email: req.body.email });
    console.log('This should POST question data into the right shape', req.params);
    res.sendStatus(201);
  },
  transformAnswerPost: (req, res) => {
    models.postAnswer({ body: req.body.body, name: req.body.name, email: req.body.email });
    models.postPhotos({ photos: req.body.photos });
    console.log('This should POST answer data in the right shape', req.params);
    res.sendStatus(201);
  },
};
