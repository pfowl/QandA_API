const models = require('./models');

// CONTROLLERS change data into the right shape to give back to the view
module.exports = {
  transformQuestions: async (req, res) => {
    const dataRes = await models.getQA(req.params.PId);
    console.log('This should turn data into the right shape', req.params);
    res.status(200).send(dataRes[0].json_build_object);
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



// {
//   "product_id": "5",
//   "results": [{
//     "question_id": 37,
//     "question_body": "Why is this product cheaper here than other sites?",
//     "question_date": "2018-10-18T00:00:00.000Z",
//     "asker_name": "williamsmith",
//     "question_helpfulness": 4,
//     "reported": false,
//     "answers": {
//       68: {
//         "id": 68,
//         "body": "We are selling it here without any markup from the middleman!",
//         "date": "2018-08-18T00:00:00.000Z",
//         "answerer_name": "Seller",
//         "helpfulness": 4,
//         "photos": []
//         // ...
//       }
//     }
//   },…]
// }