var express = require('express');
var router = express.Router();

var quizController=require('../controllers/quiz_controller');
var commentController=require('../controllers/comment_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('home', { title: 'Quiz', errors: [] });
});

router.get('/busca', function(req, res) {
  res.render('find', {errors: []});
});

router.param('quizId', quizController.load);

router.get('/author', function(req,res) {
   res.render('author', {errors: []});
});


//Rutas quizes
router.get('/quizes',	quizController.index);
router.get('/quizes/new',	quizController.new);
router.get('/quizes/create',	quizController.create);
router.get('/quizes/:quizId(\\d+)',	quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',	quizController.answer);
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);
router.get('/quizes/update/:quizId(\\d+)',	quizController.update);
router.delete('/quizes/:quizId(\\d+)',	quizController.destroy);

router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.get('/quizes/:quizId(\\d+)/add/comments', commentController.create);












module.exports = router;
