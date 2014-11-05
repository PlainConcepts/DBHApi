var urlRoutes = require('./../urls/routes');

module.exports = {
    registerRoutes: function(app){

        app.get('/login', function(req, res){
            res.render('login', {
                title: 'Express Login'
            });
        });

        urlRoutes.registerRoutes(app);


    }
};