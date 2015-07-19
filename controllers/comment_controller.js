var models = require('../models/models.js');

// GET /quizes/:quizId/comments/new
exports.new = function(req, res) {
res.render('comments/new.ejs', {quizid: req.params.quizId, errors: []});
};

// POST /quizes/:quizId/comments
exports.create = function(req, res) {
	console.log ('xxxxx -> ' + req.params.quizId); 
	var comment = models.Comment.build(
	{ texto: req.query.texto,
	QuizId: req.params.quizId
	});

var errors = comment.validate();
	if (errors)
	{
	   	
	   var i=0; var errores=new Array();//se convierte en [] con la propiedad message por compatibilida con layout
           for (var prop in errors) errores[i++]={message: errors[prop]}; 
	    res.render('comments/new', {comment: comment, quizid: req.params.quizId, errors: errores});
	}
	else
	{
		comment.save({fields: ["texto","QuizId"]}).then( function(){ res.redirect('/quizes')}) ;
	}

/*	comment
.validate()
.then(
function(err){
if (err) {
res.render('comments/new.ejs', {comment: comment, errors: err.errors});
} else {
comment // save: guarda en DB campo texto de comment
.save()
.then( function(){ res.redirect('/quizes/'+req.params.quizId)})
} // res.redirect: Redirección HTTP a lista de preguntas
}
).catch(function(error){next(error)});*/
};
