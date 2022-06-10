const models = require('./models');

module.exports = {
  transformQuestions: (req, res) => {
    models.getQA(req.params.PId);
    console.log('This should turn data into the right shape', req.params);
    res.status(200).send('questions response');
  },
  transformAnswers: (req, res) => {
    models.getAnswers(req.params.QId);
    console.log('This should turn answer data into the right shape', req.params);
    res.status(200).send('answers response');
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
