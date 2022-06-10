const router = require('express').Router();
const controller = require('./controller');

router.get('/qa/:PId', controller.transformQuestions);
router.get('/qa/:QId/answers', controller.transformAnswers);
router.post('/qa/:PId', controller.transformQuestionPost);
router.post('/qa/:QId/answers', controller.transformAnswerPost);

module.exports = router;
