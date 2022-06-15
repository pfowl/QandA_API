const router = require('express').Router();
const controller = require('./controller');

// All of the routes used by the front end
router.get('/qa/:PId', controller.transformQuestions);
router.get('/qa/:QId/answers', controller.transformAnswers);
router.post('/qa/:PId', controller.transformQuestionPost);
router.post('/qa/:QId/answers', controller.transformAnswerPost);

module.exports = router;
