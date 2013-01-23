/*jslint white: true */

/*global define, window */

define('tome/commands', ['tome/core', 'tome/terminal'], function (core, terminal) {

    'use strict';

    core.register('tome.__only', 'tome', function (mod) {

        if (!mod) {

            terminal.append('<pre>Welcome to Tome v0.1\nNeed help? Run tome -h</pre>');

        } else if (mod && mod[0] === 'h') {

            terminal.append('Help coming soon! <a href="http://thorpe-poynter.com/post/tome">Try this</a>');

        } else {

            terminal.append('Try -h');

        }

    });

    core.register('tome.of', 'tome of :name', function (name) {

        core.need('of/' + name, {

            success: function (data) {

                core.publish('tome', name + '.tome', data.html);

                terminal.unshift('Loading ' + name + '... Success!', 'success');

            },

            error: function () {

                terminal.unshift('Loading ' + name + '... Faled!', 'error');

            }

        });

        return 'Loading ' + name + '...';

    });

    core.register('tome.load', 'tome load :name', function (name) {

        core.need('load/' + name, {

            success: function (data) {

                core.publish('tome', name + '.tome', data.html, data.css);

                terminal.unshift('UnTomed ' + name + '!', 'success');

            },

            error: function () {

                terminal.unshift('Loading ' + name + '... Faled!', 'error');

            }

        });

        return 'Loading custom .tome';

    });

    core.register('tomes.from', 'tomes from :repo', function (repoName, flags) {

        core.need('repo/', {

            data: {

                path: repoName,

                flags: flags

            },

            success: function (data) {

                if (data.error) {

                    terminal.unshift(data.error, 'error folder');

                } else {

                    terminal.append("Okay, now you're using " + repoName + '.', 'success folder');

                }

            },

            error: function () {

                terminal.unshift('Something went wrong...', 'error folder');

            }

        });

        terminal.append('Switching to ' + repoName + '...');

    });

    core.register('burn.tome.__only', 'burn tome', function (flags) {

        if (!flags) {

            core.publish('reset');

            terminal.append('Removing tome from view.');

        } else {

            terminal.append('Stripping tome CSS.');

        }

        core.publish('reset:css');

    });

    core.register('tome.save', 'tome save :name', function (name) {

        window.location.href = '/download/' + name;

        return 'Testing save...';

    });

});