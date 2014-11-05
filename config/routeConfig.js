var urlRoutes = require('./../urls/routes');

module.exports = {
    registerRoutes: function(app){

        app.get('/login', function(req, res){
            res.render('login', {
                title: 'Express Login'
            });
        });

        urlRoutes.registerRoutes(app);

        // catch 404 and forward to error handler
        app.use(function(req, res, next) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        });



    }
}