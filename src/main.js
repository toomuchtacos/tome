/*jslint white: true */

/*global require */

require.config({

    baseUrl: '/example/js/',

    paths: {

        'zepto': 'vendor/zepto',

        'tome': 'tome'

    },

    shim: {

        'zepto': {

            exports: '$'

        }

    }

});

require(['tome/core', 'tome/terminal', 'tome/commands'], function (core, terminal) {

    'use strict';

    var customCSS = core.dom.find('[data-custom]', 'head'),

        consoleOutput = core.dom.find('#console ul'),

        pageTitle = core.dom.find('header h1'),

        article = core.dom.find('article');

    terminal.make(core.dom.find('#console'));

    core.subscribe('need', core.get);

    core.subscribe('tome', function (title, body, css) {

        customCSS.html(css || '');

        pageTitle.text(title);

        article.html(body);

    });

    core.subscribe('reset', function () {

        pageTitle.text('Tome');

        article.empty();

        customCSS.empty();

    });

    core.subscribe('reset:css', function () {

        customCSS.empty();

    });

    core.dom.find('[data-action=menu]').on('click', function () {

        consoleOutput.toggleClass('closed');

    });

    core.dom.find('[data-action=fullscreen]').on('click', function () {

        var el = core.dom.find('[role=main]')[0],
        
            rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen;

        if (rfs) {

            rfs.call(el);

        }

    });

});