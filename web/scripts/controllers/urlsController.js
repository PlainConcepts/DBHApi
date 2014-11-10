(function(){
    angular.module('dbh')
        .controller('UrlsController', ['$scope', '$http', '$location',
            function ($scope, $http, $location) {
                $http.get('/api/urls').then(function(urls){
                    $scope.urls = urls.data;
                });

                $scope.createUrl = function(url){
                    $location.path('/createUrl');
                };

                $scope.editUrl = function(url){
                    $location.path('/editUrl/' + url._id);
                };

                $scope.deleteUrl = function(url){
                    $http.delete('/api/urls/' + url._id).then(function(){
                        $scope.urls.splice($scope.urls.indexOf(url), 1);
                    });
                };

            }]);
})();