(function(){
    angular.module('dbh')
        .factory('urlService', ['$q', '$http', function ($q, $http) {
            var newUrl = function(){
                    return {
                        data: {
                            urls: [],
                            ico: ''
                        }
                    };
                },
                getById = function(urlId){
                    var deferred = $q.defer();
                    if(!urlId){
                        deferred.resolve(newUrl());
                        return deferred.promise;
                    }else{
                        $http.get('/api/urls/' + urlId).then(function(url){
                            deferred.resolve(url);
                        });
                    }
                    return deferred.promise;
                },
                get = function(){
                    return $http.get('/api/urls/');
                },
                create = function(url){
                    return $http.post('/api/urls/', url);
                },
                update = function(url){
                    return $http.put('/api/urls/' +url._id, url);
                },
                remove = function(url){
                    return $http.delete('/api/urls/' +url._id);
                },
                save = function(url){
                    if(url._id){
                        return update(url);
                    }else{
                        return create(url);
                    }
                };

            return {
                get: get,
                getById: getById,
                save: save,
                remove: remove
            }
        }]);
})();