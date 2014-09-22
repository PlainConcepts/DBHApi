var express = require('express');
var router  = express.Router();


var urls = [
    { ico: "stackoverflow", urls: [ "*://stackoverflow.tld/*"] },
    { ico: "msdn", urls: [ "*://msdn.microsoft.com/*", "*://code.msdn.microsoft.com/*", "*://social.msdn.microsoft.com/*"] },
    { ico: "jquery", urls: [ "*://api.jquery.com/*"] }
];

/* GET users listing. */
router.get('/', function(req, res) {
    res.json(urls);
});

module.exports = router;
