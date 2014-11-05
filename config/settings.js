
var settings = (function (){

    var connectionString;
    if (process.env.NODE_ENV == 'test') {
        connectionString = process.env.testConnectionString;
    }else {
        connectionString = process.env.connectionString
    }

    return {
        connectionString: connectionString
    };

})();


module.exports = settings;
