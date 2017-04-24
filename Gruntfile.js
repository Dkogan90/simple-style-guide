/*global module:false*/
module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt, {pattern: ['grunt-*']});

  // Global configuration
  var globalConfig = {
    src: 'src/main/',
    dest: 'dest/',
    stgu: 'src/styleguide/',
    test: 'test/',
    temp: 'temp/'
  };

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    globalConfig: globalConfig,
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
    '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
    '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
    '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
    ' Licensed <%= pkg.licenses[0].type %> URL:<%= pkg.licenses[0].url %>*/\n',
    // cleaning the temp and dest directory
    clean: {
      dest: ['<%= globalConfig.dest %>/', '<%= globalConfig.temp %>/'],
      post: ['<%= globalConfig.temp %>']
    },
    // compiles the handlebars
    // adds the helpers and partials to the handlebars compiler
    assemble: {
      options: {
        helpers: ['src/styleguide/helpers/*.js'],
        partials: ['src/styleguide/partials/*.hbs'],
        data: {
          // vendorStyle: here you have to add every vendor CSS
          vendorStyle: ['css/vendor/bootstrap.min.css', 'css/vendor/github.css'],
          // vendorScript: here you have to add ever vendor JS
          vendorScript: ['js/vendor/jquery.min.js', 'js/vendor/bootstrap.min.js', 'js/vendor/highlight.pack.js'],
          // customStyle: here you have to add every custom Style you want to add to you style guide
          customStyle: ['css/styleguide.min.css','css/example.css'],
          // customScript: here you have to add every custom JS you want to use in your style guide
          customScript: ['js/styleguide.min.js','js/example.js']
        }
      },
      // to generate the style guide it uses all templates that it can find here
      prod: {
        options: {layout: false},
        expand: true,
        cwd: 'src/main/html',
        src: ['templates/**/*.hbs'],
        dest: '<%= globalConfig.temp %>/'
      },
      // the main index file
      styleGuide: {
        src: 'src/styleguide/html/styleguide.hbs',
        dest: '<%= globalConfig.dest %>/index.html'
      },
      // the templates that are used for the tests
      dev: {
        options: {layout: false},
        expand: true,
        cwd: 'test/resources',
        src: ['templates/**/*.hbs'],
        dest: '<%= globalConfig.temp %>/'
      }
    },
    // create the web server and connects to it
    connect: {
      coverage: {
        options: {port: 8011}
      },
      livereload: {
        options: {
          port: 8011,
          livereload: 35729,
          // Change this to '0.0.0.0' to access the server from outside
          hostname: '0.0.0.0',
          open: {
            target: 'http://localhost:8011/dest/'
          },
          base: [
            '.'
          ]
        }
      }
    },
    // watches all your files and reloads your page if any changes are made
    watch: {
      srcfiles: {
        options: {
          livereload: true
        },
        files: [
          '<%= globalConfig.src %>**/*.*'
        ],
        tasks: ['liverel']
      },
      livereload: {
        options: {
          livereload: true
        },
        files: [
          '<%= globalConfig.dest %>dest/**/*.*'
        ]
      }
    },
    // copies all your files from the css, assets, and js folder to the dest file
    copy: {
      prod: {
        expand: true,
        cwd: 'src/main/',
        src: ['css/**', 'assets/**', 'js/**'],
        dest: '<%= globalConfig.dest %>'
      },
      // if you want to use the default style and code highlighting don't delete this section
      default_js: {
        expand: true,
        flatten: true,
        cwd: 'node_modules',
        src: ['highlightjs/highlight.pack.js', 'bootstrap/dist/js/bootstrap.min.js', 'jquery/dist/jquery.min.js'],
        dest: '<%= globalConfig.dest %>js/vendor'
      },
      // if you want to use the default style and code highlighting don't delete this section
      default_css: {
        expand: true,
        flatten: true,
        cwd: 'node_modules',
        src: ['highlightjs/styles/github.css', 'bootstrap/dist/css/bootstrap.min.css'],
        dest: '<%= globalConfig.dest %>css/vendor'
      }
    },
    // minifiles the style guide css and js
    uglify: {
      prod: {
        options: {
          sourceMap: true,
          banner: '<%= banner %>'
        },
        files: {
          '<%= globalConfig.dest %>js/styleguide.min.js': '<%= globalConfig.stgu %>js/styleguide.js'
        }
      }
    },
    // compiles the style guide scss file to a css file
    sass: {
      options: {
        style: 'compressed'
      },
      dist: {
        files: {
          '<%= globalConfig.dest %>css/styleguide.min.css': '<%= globalConfig.stgu %>css/styleguide.scss'
        }
      }
    },
    // testing framework
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          quiet: false, // Optionally suppress output to standard out (defaults to false)
          clearRequireCache: false, // Optionally clear the require cache before running tests (defaults to false)
          noFail: false // Optionally set to not fail on failed tests (will still fail on other errors)
        },
        src: ['test/**/*[s|S]pec.js']
      }
    }
  });

  grunt.registerTask('default', ['develop']);
  grunt.registerTask('develop', ['clean:dest', 'copy', 'uglify', 'sass', 'assemble:prod', 'assemble:styleguide', 'connect:livereload', 'watch']);
  grunt.registerTask('build', ['clean:dest', 'copy', 'uglify', 'sass', 'assemble:prod', 'assemble:styleguide', 'clean:post']);
  grunt.registerTask('liverel', ['clean:dest', 'copy','uglify', 'sass', 'assemble:prod', 'assemble:styleGuide']);
  grunt.registerTask('test', ['clean:dest', 'assemble:dev', 'mochaTest', 'clean:post']);
};
