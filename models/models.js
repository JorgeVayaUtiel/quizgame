var path=require('path');
var url= process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6]||null);
var user=(url[2]||null);
var pwd = (url[3]||null);
var protocol = (url[1]||null);
var dialect = (url[1]||null);
var port = (url[5]||null);
var host = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;


//cargar modelo ORM
var Sequelize = require('sequelize');

//var sequelize= new Sequelize(null, null, null, {dialect: "sqlite", storage: "quiz.sqlite"} );

var sequelize = new Sequelize(DB_name, user, pwd, 
   { dialect: protocol,
     protocol: protocol,
     port: port,
     host: host,
     storage: storage,
     omitNull: true
   }
);	 
			
var Quiz= sequelize.import(path.join(__dirname,'quiz'));
var Comment= sequelize.import(path.join(__dirname,'comment'));

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

exports.Quiz = Quiz;
exports.Comment = Comment;

sequelize.sync().success(function() {
	Quiz.count().success(function(count) {
		if (count==0) {
			Quiz.create({pregunta: 'Capital de Italia',
				     respuesta: 'Roma'
				     });
			Quiz.create({pregunta: 'Capital de Portugal',
				     respuesta: 'Lisboa'
				     })

			.success(function(){console.log('Base de datos iniciada')});
		};
	});
});
