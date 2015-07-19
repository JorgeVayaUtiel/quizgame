var models=require('../models/models.js');


// Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
models.Quiz.find({
where: {
id: Number(quizId)
},
include: [{
model: models.Comment
}]
}).then(
function(quiz) {
if (quiz) {
req.quiz = quiz;
next();
} else { next(new Error('No existe quizId=' + quizId)); }
}
).catch(function(error) { next(error);});
};

//GET /quizes
exports.index=function(req,res){
	if (req.query.search) {
		models.Quiz.findAll({where: ["pregunta like ?", "%" + req.query.search + "%"]}).then(function(quizes){
		res.render('quizes/result.ejs', {quizes: quizes, termino: req.query.search, errors: []});}).catch(function(error) {next(error);});
	}
	else
	{
		models.Quiz.findAll().then(function(quizes) {
		res.render('quizes/index.ejs', {quizes: quizes, errors: []});
		}).catch(function(error) {next(error);})
	}
};

//GET /quizes/:id
exports.show=function(req,res) {
	models.Quiz.find(req.params.quizId).then(function(quiz) {
		res.render('quizes/show', {quiz: req.quiz, errors: []});
		})
};


//GET /quizes/:id/answer
exports.answer= function(req,res) {
	models.Quiz.find(req.params.quizId).then(function(quiz) {
		if (req.query.respuesta==req.quiz.respuesta) {
			res.render('quizes/answer', {quiz: req.quiz, respuesta: 'Correcto', errors: []});
		}
		else
		{
			res.render('quizes/answer', {quiz: req.quiz, respuesta: 'Incorrecta', errors: []});
		}
	})
};


//GET /quizes/new

exports.new = function(req, res) {
var quiz = models.Quiz.build( // crea objeto quiz
{pregunta: "Pregunta", respuesta: "Respuesta", tema: "Otro"}
);
res.render('quizes/new', {quiz: quiz, errors: []});
};

//POST /quizes/create
exports.create = function(req,res) {
	
	var quiz = models.Quiz.build( {pregunta: req.query.pregunta, respuesta: req.query.respuesta, tema: req.query.tema} );
	//console.log(" 1 " + req.query.pregunta + " 2 "  + req.query.respuesta +  " 3 " + req.query.tema);
	
	var errors = quiz.validate();
	if (errors)
	{
	   	
	   var i=0; var errores=new Array();//se convierte en [] con la propiedad message por compatibilida con layout
           for (var prop in errors) errores[i++]={message: errors[prop]}; 
	    res.render('quizes/new', {quiz: quiz, errors: errores});
	}
	else
	{
		quiz.save({fields: ["pregunta", "respuesta", "tema"]}).then( function(){ res.redirect('/quizes')}) ;
	}

};

//GET quizes/:id/edit
exports.edit=function(req,res) {
	var quiz= req.quiz;
	res.render('quizes/edit', { quiz:quiz, errors: []});

};

//PUT /quizes/:id
exports.update = function(req,res) {

	req.quiz.pregunta = req.query.pregunta;
	req.quiz.respuesta = req.query.respuesta;
	req.quiz.tema = req.query.tema;
	//console.log("Pregunta -> " + req.quiz.pregunta);
	
	var errors= req.quiz.validate();
	if (errors)
	{
	   	
	   var i=0; var errores=new Array();//se convierte en [] con la propiedad message por compatibilidad con layout
           for (var prop in errors) errores[i++]={message: errors[prop]}; 
	    res.render('quizes/edit', {quiz: quiz, errors: errores});
	}
	else
	{
		req.quiz.save({fields: ["pregunta", "respuesta", "tema"]}).then( function(){ res.redirect('/quizes')}) ;
	}
	

};

exports.destroy= function(req,res) {
	req.quiz.destroy().then ( function() { res.redirect('/quizes'); });
};
