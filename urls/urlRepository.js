var mongoose = require('mongoose');
var extend = require('util')._extend;
var Q = require('q');

var Model = mongoose.model('Url', new mongoose.Schema({
    name: String,
    ico: String,
    urls: [String]
}));

var urlRepository = (function (){
    var create = function(url){
            var deferred = Q.defer();
            var newUrl = new Model(url);

            newUrl.save(function(err, createdUrl){
                if(err){
                    deferred.reject(new Error(err));
                }else{
                    deferred.resolve(createdUrl._doc);
                }
            });

            return deferred.promise;
        },
        update = function(id, url){
            var deferred = Q.defer();

            Model.findById(id, function (err, urlToUpdate) {
                if(err){
                    deferred.reject(new Error(err));
                }
                extend(urlToUpdate, url);
                urlToUpdate.save(function(updateErr, updatedUrl){
                    if(updateErr){
                        deferred.reject(new Error(updateErr));
                    }else {
                        deferred.resolve(updatedUrl._doc);
                    }
                });
            });

            return deferred.promise;
        },
        remove = function(id){
            return Q.ninvoke(Model, 'remove', {
                _id: id
            });
        },
        find = function(){
            var deferred = Q.defer();

            Model.find(function (err, urls) {
                if(err){
                    deferred.reject(new Error(err));
                }else {
                    urls = urls.map(function(url){return url._doc;});
                    deferred.resolve(urls);
                }
            });

            return deferred.promise;
        };

    return {
        create: create,
        find: find,
        update: update,
        remove: remove
    };

})();


module.exports = urlRepository;