// MW de autorización de accesos HTTP restringidos
exports.loginRequired = function(req, res, next){
if (req.session.user) {
next();
} else {
res.redirect('/login');
}
};

//MW de comprobación
exports.sesionExpirada = function(req, res, next)
{
if (req.session.user) {
	var actual = new Date().getTime()
	var ultima = req.session.lastAccess;
	req.session.lastAccess= actual;
	//Diferncia en milisegundos
	var diferencia = actual - ultima;
	if (diferencia>120000) {
		//console.log('Sesion Expirada');
		res.redirect('/logout');
	}
	else {
	//console.log('Ultima ' + ultima + " Actual " + actual);
	next();}


}
else
{
	next();
}
};
// Get /login -- Formulario de login
exports.new = function(req, res) {
var errors = req.session.errors || {};
req.session.errors = {};
res.render('sessions/new', {errors: errors});
};
// POST /login -- Crear la sesion si usuario se autentica
exports.create = function(req, res) {
var login = req.body.login;
var password = req.body.password;
var userController = require('./user_controller');
userController.autenticar(login, password, function(error, user) {
if (error) { // si hay error retornamos mensajes de error de sesión
req.session.errors = [{"message": 'Se ha producido un error: '+error}];
res.redirect("/login");
return;
}
// Crear req.session.user y guardar campos id y username
// La sesión se define por la existencia de: req.session.user
req.session.lastAccess = new Date().getTime();
req.session.user = {id:user.id, username:user.username, isAdmin:user.isAdmin};
res.redirect("/");// redirección a path anterior a login
});
};
// DELETE /logout -- Destruir sesion
exports.destroy = function(req, res) {
delete req.session.user;
delete req.session.lastAccess;
res.redirect("/salida"); // redirect a salida
};


