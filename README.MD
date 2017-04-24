# Simple style guide

This simple style guide generator creates a style guide documentation similar to the [bootstrap](http://getbootstrap.com/) 
documentation. It copies the JS and CSS files to the dest folder and creates link to the files in the `index.html`.

Reason:
I tests out many style guide generator tools, but not a single one supports pre created JS files.
So that I could create a style guide with the functionality from my companies javascript files.

Attention:
This is my first tool that I put to the public. At the moment I'am doing a software developer apprenticeship and I'am 
still learning. So please feel free to make any critic.


## Installation

1. Install Node dependencies

        npm install

## Usage

Create [handlebars](http://handlebarsjs.com/) in the `templates` directory to create new section you want to document. Create 
a new directory to create a head section and the files in this directory are subsections of it.

You can name your files starting with numbers ascending order like `1.`,`2.` to create a specific order.

In the handlebars files you can use [assemble.io's markdown](http://assemble.io/docs/Markdown.html) to help you create your templates. Here for see the example
handlebar files.

### Gruntfile

Before you compile your templates you have to add all custom JS and CSS files in the assemble section of the gruntfile.
([Never used grunt?](https://gruntjs.com/))
See the inline documentation in the gruntfile.

### Directory structure
    src
    ├── main                                        // the useres working area
    │   ├── assets                                  // where you can include all your assets
    │   │   └── fonts
    │   ├── css                                     
    │   │   ├── example.css                         // example.css - your custom CSS for the style guide - can be removed
    │   │   └── vendor                              // where you can include all your vendor CSS files
    │   ├── html                            
    │   │   └── templates                           // where all the template handlebars files should be created
    │   │       ├── example.hbs
    │   │       ├── markdown
    │   │       │   ├── description.hbs
    │   │       │   └── options.hbs
    │   │       └── styleguide-class
    │   │           ├── styleguide-example.hbs
    │   │           └── styleguide-figure.hbs
    │   └── js                                       
    │       ├── example.js                          // example.js - your custom JS for the style guide - can be removed
    │       └── vendor                              // where you can include all your vendor JS files
    └── styleguide                                  // files to generate the style guide
        ├── css
        │   └── styleguide.scss                     // default layout of the style guide
        ├── helpers
        │   ├── helper-templates-nav.js             // Helper to create the navbar
        │   └── helper-templates.js                 // Helper to create the style guide content
        ├── html
        │   └── styleguide.hbs                      // Main entrance point of the style guide - index.html
        ├── js
        │   └── styleguide.js                       // default style guide functions
        └── partials
            ├── content.hbs                         // Partitail that handles the content
            ├── header.hbs                          // Partitail that handles the header
            └── sidebar.hbs                         // Partitail that handles the nav bar


## Build Process
To build the the style guide simply type `grunt build` in your cli.

For development just type `grunt develop` or `grunt` in your cli. It will open a new browser window and displays your 
style guide.

## Deployment
You can upload the content of the `dest` folder to a web server.

## Other used JS

The code highlighting is done with [highlightJs](https://highlightjs.org/).

## Upcoming

The upcoming plans are:

1. Create handlebars partials to handle the example and figure areas of templates.
2. Create handlebars helper to create a better locking code example area.

## Support & Ownership

Feel free to ask [David Kogan](david_kogan@hotmail.de) if you need some support when there are any questions left or if you need some support.



