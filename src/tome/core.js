/*jslint white: true, unparam: true */

/*global console, define, document */

define('tome/core', ['zepto'], function ($) {

    'use strict';

    var core = {},

        globalChannels = [];

    core.dom = {

        find: function (selector, context) {

            context = context || document;

            return $(context).find(selector);

        }

    };

    core.each = function (list, callback, context) {

        var max = list.length,

            i = 0;

        for (i = 0; i < max; i += 1) {

            if (list[i] && callback.call(context, list[i], i, list)) {

                return list;

            }

        }

    };

    core.replaceAll = function (str, regex, withStr) {

        var matches = str.match(regex) || [];

        core.each(matches, function (match) {

            str = str.replace(match, withStr);

        });

        return str;

    };

    core.namespace = function (ns, nsString, value) {

        var parent = ns;

        core.each(nsString.split('.'), function (part, i, parts) {

            if (parent[parts[i]] === undefined) {

                parent[parts[i]] = {};

                if (i === parts.length - 1 && value) {

                    parent[parts[i]] = value;

                }

            }

            parent = parent[parts[i]];

        });

        return parent;

    };

    core.subscribe = function (channel, fn, context) {
        
        var channels = this.channels || globalChannels;

        if (!channels[channel]) {

            channels[channel] = [];

        }

        channels[channel].push({ context: context || this, callback: fn });

        return this;

    };

    core.publish = function (channel) {
        
        var channels = this.channels || globalChannels,

            args = Array.prototype.slice.call(arguments, 1);

        if (!channels[channel]) {

            return false;
        
        }

        core.each(channels[channel], function (subscription) {

            subscription.callback.apply(subscription.context, args);

        });

        return this;

    };

    core.register = function (path, options) {

        Array.prototype.unshift.call(arguments, 'register');

        core.publish.apply(this, arguments);

    };

    core.need = function (path, options) {

        core.publish.call(this, 'need', path, options);

    };

    core.get = function (path, options) {

        $.ajax({

            url: '/' + path,

            dataType: options.type || 'json',

            data: options.data,

            success: function (data) {

                if (options.success) {

                    options.success(data, options.data);

                } else {

                    console.warn('Unhandled success.');

                }

            },

            error: options.error || function () {

                console.error('No such tome: ' + options.data);

            }

        });

    };

    return core;

});