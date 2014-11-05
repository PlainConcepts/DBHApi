var mongoose = require('mongoose');

var Model = mongoose.model('Url', new mongoose.Schema({
    name: String,
    ico: String,
    urls: [String]
}));

var urlRepository = (function (){
    var connect = function(){
            return mongoose.connect('mongodb://plaingithub:abra.cadabra.77@ds027758.mongolab.com:27758/dbh');
        },
        create = function(url){
            connect();
            var newUrl = new Model(url);
            newUrl.save(function(err){
                if(err){
                    console.log(err);
                }
            })
        },
        update = function(id, url){
            //TODO: remove id?
           connect();
           Model.findById(id, url, function(err, urlToUpdate){
               if(err){
                   extend(urlToUpdate, url);
                   urlToUpdate.save(function(err){
                       if(err){
                           console.log(err);
                       }
                   });
               }
           })
        },
        remove = function(id){
            connect();
            Model.remove({
                _id: id
            }, function(err) {
                if(err){
                    console.log(err);
                }
            });
        },
        find = function(callback){
            connect();
            Model.find(callback);
        };

    return {
        create: create,
        find: find,
        update: update,
        remove: remove
    };

})();


module.exports = urlRepository;