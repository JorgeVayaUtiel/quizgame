var express = require('express');
var router = express.Router();

var quizController=require('../controllers/quiz_controller');
var commentController=require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
/*router.get('/', function(req, res) {
  res.render('home', { title: 'Quiz', errors: [], mensaje:'' });
});*/
router.get('/', sessionController.sesionExpirada, quizController.showraiz);


router.get('/salida', function(req, res) {
  res.render('home', { title: 'Quiz', errors: [], mensaje:'Sesión terminada' });
});




/*router.get('/busca', function(req, res) {
  res.render('find', {errors: []});
});*/
router.get('/busca', sessionController.sesionExpirada, quizController.showbusca);


router.param('quizId', quizController.load);
router.param('commentId', commentController.load);

//Definición de rutas de sesión
router.get('/login', sessionController.new);
router.post('/login', sessionController.create);
router.get('/logout', sessionController.destroy);

/*router.get('/author' , function(req,res) {
   res.render('author', {errors: []});
});*/
router.get('/author' , sessionController.sesionExpirada, quizController.showautor);




//Rutas quizes
router.get('/quizes', sessionController.sesionExpirada,	quizController.index);
router.get('/quizes/new', sessionController.sesionExpirada, sessionController.loginRequired, quizController.new);
router.get('/quizes/create', sessionController.sesionExpirada, sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)', sessionController.sesionExpirada, quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',sessionController.sesionExpirada, quizController.answer);
router.get('/quizes/:quizId(\\d+)/edit', sessionController.sesionExpirada, sessionController.loginRequired, quizController.edit);
router.get('/quizes/update/:quizId(\\d+)',sessionController.sesionExpirada, sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)', sessionController.sesionExpirada, sessionController.loginRequired,	quizController.destroy);

//Rutas comentarios
router.get('/quizes/:quizId(\\d+)/comments/new', sessionController.sesionExpirada, commentController.new);
router.get('/quizes/:quizId(\\d+)/add/comments', sessionController.sesionExpirada,  commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.sesionExpirada, sessionController.loginRequired, commentController.publish);





module.exports = router;
