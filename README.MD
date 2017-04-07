# README Template

A template of README best practices to make your README simple to understand and easy to use.

## Installation

Quickly describe how to install your project and how to get it running

1. Install Styleguide dependencies

        git clone https://YOUR_USERNAME@bitbucket.org/interrogaregmbh/simple-styleguide.git

2. Install Node dependencies

        npm install

## Usage
    .
    ├── main                                        // the useres working area
    │   ├── assets                                  // where you can include all your assets
    │   │   └── fonts
    │   ├── css                                     
    │   │   ├── example.css                         // example.css - your custom css for the styleguide - can be removed
    │   │   └── vendor                              // where you can include all your vendor css files
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
    │       ├── example.js                          // example.js - your custom js for the styleguide - can be removed
    │       └── vendor                              // where you can include all your vendor js files
    └── styleguide                                  // files to generate the styleguide
        ├── css
        │   └── styleguide.scss                     // default layout of the styleguide
        ├── helpers
        │   ├── helper-templates-nav.js             // Helper to create the navbar
        │   └── helper-templates.js                 // Helper to create the styleguide contetn
        ├── html
        │   └── styleguide.hbs                      // Main entrance point of the styleguide
        ├── js
        │   └── styleguide.js                       // default styleguide functions
        └── partials
            ├── content.hbs                         // Partitail that handles the content
            ├── header.hbs                          // Partitail that handles the header
            └── sidebar.hbs                         // Partitail that handles the nav bar


### Build Process
To build the the style guide simply type `grunt build` in the cli.

For development just type `grunt develop` or `grunt` in the cli.

### Deployment
You can upload the content of the `dest` folder to a web server.

## Support & Ownership

Feel free to ask [David Kogan](david.kogan@interrogare.de) if you need some support when there are any questions left or if you need some support.



