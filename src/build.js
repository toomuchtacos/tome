({

    baseUrl: './',

    paths: {

        'zepto': '../example/js/vendor/zepto',

        'tome': './tome'

    },

    shim: {

        'zepto': {

            exports: '$'

        }

    },

	wrap: {

        start: "(function() {",

        end: "}());"
    
    },

    optimize: "uglify",

    name: "main",

    out: "../example/js/main.js"

})