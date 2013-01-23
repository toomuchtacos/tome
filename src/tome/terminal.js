/*jslint white: true */

/*global console, define */

define('tome/terminal', ['tome/core', 'tome/parser'], function (core, parser) {

    'use strict';

    var terminal = {},

        $el = {};

    function onEnter (text) {

        var command = parser.parse(text),

            response = command.method.apply(command.method, command.args);

        terminal.clearInput();

        if (typeof response === 'string' || (response && response.text)) {

            terminal.append(text, 'user');

            terminal.append(response.text || response, response.as || 'output');

        }

    }

    terminal.make = function (container) {

        $el.console = container;

        $el.input = $el.console.find('textarea, input');

        $el.output = $el.console.find('ul');

        $el.input.on('keypress', function (e) {

            var text = $el.input.val(),

                key = e.keyCode || e.charCode,

                ENTER = 13;

            if (key === ENTER && text.length) {

                e.preventDefault();

                onEnter(text);

            } else if (key === ENTER && !text.length) {

                e.preventDefault();

            }

        });

        $el.console.on('click', function () {

            core.dom.find('input', this).focus();

        });

    };

    terminal.append = function (text, type) {

        var result = '';
        
        result += text;

        if (text) {

            $el.output.append('<li class="' + type + '""><code>' + result + '</code></li>');

        }

        terminal.toBottom();

    };

    terminal.clearInput = function () {

        $el.input.val('');

    };

    terminal.unshift = function () {
        
        $el.output.find('li').last().remove();

        terminal.append.apply(terminal, arguments);

    };

    terminal.pop = function () {
        
        $el.output.find('li').last().remove();

    };

    terminal.toBottom = function () {

        $el.output[0].scrollTop = $el.output[0].scrollHeight;

    };

    return terminal;

});