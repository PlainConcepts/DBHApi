(function(){
    angular.module('dbh')
        .controller('EditUrlController', ['$scope', '$http', '$routeParams','$location','urlService',
            function ($scope, $http, $routeParams, $location, urlService) {
                var back = function(){
                    $location.path('/');
                };

                urlService.getById($routeParams.urlId).then(function (url) {
                   $scope.url = url.data;
                });

                $scope.save = function(){
                    urlService.save($scope.url).then(back);
                };

                $scope.cancel = back;

                $scope.addPattern = function(pattern) {
                    $scope.url.urls.push(pattern);
                    $scope.newPattern = '';
                };

                $scope.removePattern = function(pattern) {
                    $scope.url.urls.splice($scope.url.urls.indexOf(pattern), 1);
                };
            }]);
})();