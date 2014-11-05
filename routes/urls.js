var express = require('express');
var router = express.Router();

var urls = [
    { ico: "google.png", urls: [ "*://*.google.tld/search*"] },
    { ico: "stackoverflow.png", urls: [ "*://stackoverflow.tld/*"] },
    { ico: "googlegroups.ico", urls: [ "*://groups.google.com/*"] },

    { ico: "oreilly.ico", urls: [ "*://answers.oreilly.com/*"] },
    { ico: "readthedocs.ico", urls: [ "*://*readthedocs.org/*"] },
    { ico: "apidock.ico", urls: [ "*://apidock.com/*"] },

    { ico: "mozilla.ico", urls: [ "*://developer.mozilla.org/*"] },

    // msdn
    { ico: "msdn.png", urls: [ "*://msdn.microsoft.com/*", "*://code.msdn.microsoft.com/*", "*://social.msdn.microsoft.com/*"] },

    // javadocs, general
    { ico: ".ico", urls: [ "*://*/docs/javadocs/*"] },

    // repository sites?
    { ico: "google.ico", urls: [ "*://code.google.com/*"] },
    { ico: "github.ico", urls: [ "*://github.tld/*"] },
    { ico: "blocks.png", urls: [ "*://bl.ocks.org/*"] },

    // clojure
    { ico: "clojure.ico", urls: [ "*://clojure.org/*", "*://clojure.github.com/clojure/*"] },

    // nodejs
    { ico: "nodejs.ico", urls: [ "*://nodejs.org/api/*"] },

    // coffeescript
    { ico: "coffeescript.ico", urls: [ "*://coffeescript.org/*"] },

    // ruby
    { ico: "ruby.ico", urls: [ "*://ruby-doc.org/*", "*://www.ruby-doc.org/*"] },
    { ico: "rubyonrails.ico", urls: [ "*://api.rubyonrails.org/*"] },

    // host many projects' documentation, generted by yard.
    { ico: "rubyinfo.png", urls: [ "*://rubydoc.info/*"] },

    // route frameworks
    { ico: "stripe.png", urls: [ "*://stripe.com/docs/*"] },
    { ico: "nancy.ico", urls: [ "*://github.com/NancyFx/Nancy/wiki/*"] },

    // css-ish
    { ico: "compass.png", urls: [ "*://compass-style.org/reference/*"] },
    { ico: "less.ico", urls: [ "*://lesscss.tld/#*", "*://less-ja.studiomohawk.com/*",
        "*://ciembor.github.com/lesscss.org/*", "*://bertzzie.com/post/7/dokumentasi-less-bahasa-indonesia*"] },

    // php
    { ico: "php.ico", urls: [ "*://www.php.net/manual/*"] },
    { ico: "laravel.png", urls: [ "*://laravel.com/docs/*"] },

    // sql
    { ico: "mysql.ico", urls: [ "*://dev.mysql.com/doc/*"] },
    { ico: "postgresql.ico", urls: [ "*://www.postgresql.org/docs/*", "*://www.postgresql.jp/document/*", "*://docs.postgresqlfr.org/*",
        "*://wiki.postgresql.org/*"] },

    // python
    { ico: "python.ico", urls: [ "*://docs.python.org/", "*://wiki.python.org/", "*://*python.org/dev/peps/*", "*://*python.org/doc/*" ] },
    { ico: "django.ico", urls: [ "*://docs.djangoproject.com/*"] },

    { ico: "scipy.ico", urls: [ "*://docs.scipy.org/doc/*", "*://www.scipy.org/Cookbook*" ] },
    { ico: ".ico", urls: [ "*://matplotlib.org/*" ] },

    // R
    { ico: "R.ico", urls: [ "*://cran.r-project.org/doc/*", "*://rwiki.sciviews.org/*"] },

    // IDL
    { ico: "idl.ico", urls: [ "*://www.exelisvis.com/docs/*"] },

    // C++ (very incomplete)
    { ico: "boost.ico", urls: [ "*://www.boost.org/doc/*"] },

    // eLisp
    { ico: "gnu.ico", urls: [ "*://www.gnu.org/software/emacs/manual/html_node/elisp/*",
        "http://www.gnu.org/software/emacs/manual/html_mono/elisp.html*"] },

    ///// javascript ///////
    // jquery
    { ico: "jquery.ico", urls: [ "*://api.jquery.com/*"] },

    // prototype
    { ico: ".ico", urls: [ "*://api.prototypejs.org/*", "*://prototypejs.org/learn/*"] },

    // d3
    { ico: ".ico", urls: [ "*://github.com/mbostock/d3/wiki/*"] },

    // yui
    { ico: "yui.ico", urls: [ "*://yuilibrary.com/yui/docs/*"] },

    // dojo
    { ico: "dtk.ico", urls: [ "*://dojotoolkit.org/documentation/*", "*://dojotoolkit.org/reference-guide/*", "*://dojotoolkit.org/api/*"] },
    // processing
    { ico: "processingjs.ico", urls: [ "*://processingjs.org/reference/*", "*://processingjs.org/learning/*", "*://processingjs.org/articles/*"]},
    // extjs
    { ico: "sencha.ico", urls: [ "*://docs.sencha.com/*"] },
    // mootools
    { ico: "mootools.ico", urls: [ "*://mootools.net/docs/*"] },
    // raphael
    { ico: "raphaeljs.ico", urls: [ "*://raphaeljs.com/reference.html*"] },
    // rightjs
    { ico: ".ico", urls: [ "*://rightjs.org/docs*", "*://rightjs.org/tutorials*"] },
    // threejs
    { ico: ".ico", urls: [ "*://mrdoob.github.com/three.js/docs/*"] },
    // zepto
    { ico: "zepto.png", urls: [ "*://zeptojs.com/#*"]},
    // shipyard
    { ico: ".ico", urls: [ "*://seanmonstar.github.com/Shipyard/api/*", "*://seanmonstar.github.com/Shipyard/topics/*"] },
    // knockoutjs
    { ico: "knockoutjs.png", urls: [ "*://knockoutjs.com/documentation/*" ] },
    // x toolkit edge
    { ico: ".ico", urls: [ "*://api.goxtk.com/*" ] },
    // angularjs
    { ico: "angularjs.ico", urls: [ "*://docs.angularjs.org/*" ]},
    // enyo
    { ico: "enyo.ico", urls: [ "*://enyojs.com/api/*", "*://enyojs.com/docs/*", "*://github.com/enyojs/enyo/wiki/*"] },
    // underscore
    { ico: "underscore.ico", urls: [ "*://underscorejs.org/#"] },
    // bonsai
    { ico: "bonsai.ico", urls: [ "*://docs.bonsaijs.org/*"] },
    // kineticjs
    { ico: "kineticjs.ico", urls: [ "*://kineticjs.com/docs/*"] },
    // thorax
    { ico: ".ico", urls: [ "*://thoraxjs.org/api.html*"] },
    // createjs ??
    // qooxdoo
    { ico: "qx.png", urls: [ "*://manual.qooxdoo.org/*", "*://demo.qooxdoo.org/*"] },
    // fabricjs // Lots of neat demos, but not in demo subdirectory
    { ico: ".ico", urls: [ "*://github.com/kangax/fabric.js/wiki*", "*://fabricjs.com/*"]},
    // momentjs
    { ico: "momentjs.ico", urls: [ "*://momentjs.com/docs/*"] },
    //backbone
    { ico: "backbone.ico", urls: [ "*://backbonejs.org/*" ] },
    //handlebars
    { ico: ".ico", urls: [ "*://handlebarsjs.com/*"] },

    // OTHER STUFF

    // eclipse
    { ico: "eclipse.ico", urls: [ "*://wiki.eclipse.org/PDE/*", "*://help.eclipse.org/*" ] },

    // java
    { ico: "oracle.ico", urls: [ "*://docs.oracle.com/javase/*/docs/*" ] },

    // scala
    { ico: "scala.ico", urls: [ "*://www.scala-lang.org/api/*" ]},

    // android
    { ico: "android.png", urls: [ "*://developer.android.com/*" ]},

    // iOS
    { ico: "iOS.ico", urls: [ "*://developer.apple.com/library/ios/*"]},

    // chrome
    { ico: "chrome.png", urls: [ "*://developer.chrome.com/extensions/*"]}
];

module.exports = router;
