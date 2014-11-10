(function(){
    var app = angular.module('dbh', ['ngRoute', 'ngMessages']);
    app.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
                when('/', {
                    templateUrl: 'views/urls.html',
                    controller: 'UrlsController'
                }).
                when('/createUrl', {
                    templateUrl: 'views/urlForm.html',
                    controller: 'EditUrlController'
                }).
                when('/editUrl/:urlId', {
                    templateUrl: 'views/urlForm.html',
                    controller: 'EditUrlController'
                });
        }]);
})();