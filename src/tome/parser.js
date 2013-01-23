/*jslint white: true, unparam: true */

/*global console, define */

define('tome/parser', ['tome/core'], function (core) {

    'use strict';

    var api = {},

        registeredCommands = {},

        routes = [];

    api.register = function (methodName, syntax, method) {

        var nsCommand = core.namespace.call(core.namespace, registeredCommands, methodName, method);

        routes.push({

            regex: api.makeRouteRegex(syntax),

            method: nsCommand

        });

        return nsCommand;

    };

    api.makeRouteRegex = function (syntax) {

        var rx;

    /*  Replace all variable flags (:variable) */
        rx = core.replaceAll(syntax, /:\w+/g, '([A-Za-z0-9\\/:\\."]*)');

    /*  Add flag capturing */
        rx = '^' + rx + '(?:(?:\\s(-.*)))?$';

        rx = new RegExp(rx, 'i');

        return rx;

    };

    api.matchRoute = function (text) {

        var matchedRoute;

        core.each(routes, function (route) {

            var match = text.match(route.regex),

                flagString;

            if (match) {

                match = match.slice(1);

                flagString = match.pop();

                if (flagString) {

                    match.push(flagString.replace(/-/g, '').split(' '));

                }

                matchedRoute = {

                    route: route,

                    args: match,

                    method: route.method

                };

            }

        });

        return matchedRoute;

    };

    api.parse = function (text) {

        var parsed = api.matchRoute(text);

        if (!parsed) {

            return {

                method: function () {

                    console.warn(text);

                    return {

                        text: "No such command '" + text + "'!",

                        as: 'error'

                    };

                }

            };

        }

        return parsed;

    };

    core.subscribe('register', api.register);

    api.registeredCommands = registeredCommands;

    return api;

});