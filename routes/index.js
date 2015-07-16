var express = require('express');
var router = express.Router();

var quizController=require('../controllers/quiz_controller');


/* GET home page. */
router.get('/', function(req, res) {
  res.render('home', { title: 'Quiz' });
});

router.get('/busca', function(req, res) {
  res.render('find');
});

router.param('quizId', quizController.load);

router.get('/author', function(req,res) {
   res.render('author');
});


//Rutas quizes
router.get('/quizes',	quizController.index);
router.get('/quizes/:quizId(\\d+)',	quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',	quizController.answer);

module.exports = router;
