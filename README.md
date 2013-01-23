# Tome
A browser based command line utility / reader app.

- [Read the introductory blog post](http://thorpe-poynter.com/post/tome/).
- [Try the example app](http://tome.thorpe-poynter.com/).

## Tome is still in it's infancy!
You can [preview an example application here](http://tome.thorpe-poynter.com/). As of now, this repository only holds modules which demonstrate client-side command registration, command parsing and the creation of a basic terminal interface.

### What to expect:
The above [example app](http://tome.thorpe-poynter.com/) runs on a Node.js / Express server which handles parsing markdown into HTML and responding to the various commands issued through the terminal. I'll soon be committing an example directory which contains what you'll need to get your own server going.

## Basic Command Docs ([for example app](http://tome.thorpe-poynter.com/)):

- `tome`: Show welcome message.
- `tome -h`: Show help.
- `tome of [fileName]`: Return tome contents from the current library, specified by name. (e.g.: `tome of tacos`)
- `tomes from [libraryName]`: Switch to a given library in the current repository.
- `tome load [tomeName]`: Read a .tome file from the current library and return it's contents and CSS. (_currently only one example: 'sample' from 'library2'_)
- `burn tome`: Remove a tome from view.
- `burn tome -css`: Remove custom CSS from a loaded tome.

### Supported Libraries
- library
- library2

### Current Tome Names
- this
- tacos
- townportal