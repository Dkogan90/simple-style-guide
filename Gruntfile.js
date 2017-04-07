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
    clean: {
      dest: ['<%= globalConfig.dest %>/', '<%= globalConfig.temp %>/'],
      post: ['<%= globalConfig.temp %>']
    },
    assemble: {
      options: {
        helpers: ['src/styleguide/helpers/*.js'],
        partials: ['src/styleguide/partials/*.hbs'],
        data: {
          vendorStyle: ['css/vendor/bootstrap.min.css', 'css/vendor/github.css'],
          vendorScript: ['js/vendor/jquery.min.js', 'js/vendor/bootstrap.min.js', 'js/vendor/highlight.pack.js'],
          customStyle: ['css/styleguide.min.css','css/example.css'],
          customScript: ['js/styleguide.min.js','js/example.js']
        }
      },
      prod: {
        options: {layout: false},
        expand: true,
        cwd: 'src/main/html',
        src: ['templates/**/*.hbs'],
        dest: '<%= globalConfig.temp %>/'
      },
      styleGuide: {
        src: 'src/styleguide/html/styleguide.hbs',
        dest: '<%= globalConfig.dest %>/index.html'
      }
    },
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
    copy: {
      prod: {
        expand: true,
        cwd: 'src/main/',
        src: ['css/**', 'assets/**', 'js/**'],
        dest: '<%= globalConfig.dest %>'
      },
      default_js: {
        expand: true,
        flatten: true,
        cwd: 'node_modules',
        src: ['highlightjs/highlight.pack.js', 'bootstrap/dist/js/bootstrap.min.js', 'jquery/dist/jquery.min.js'],
        dest: '<%= globalConfig.dest %>js/vendor'
      },
      default_css: {
        expand: true,
        flatten: true,
        cwd: 'node_modules',
        src: ['highlightjs/styles/github.css', 'bootstrap/dist/css/bootstrap.min.css'],
        dest: '<%= globalConfig.dest %>css/vendor'
      }
    },
    uglify: {
      prod: {
        options: {
          sourceMap: true,
          banner: '<%= banner %>'
        },
        files: {
          '<%= globalConfig.dest %>js/styleguide.min.js': '<%= globalConfig.stgu %>js/styleguide.js',
        }
      }
    },
    sass: {
      options: {
        style: 'compressed'
      },
      dist: {
        files: {
          '<%= globalConfig.dest %>css/styleguide.min.css': '<%= globalConfig.stgu %>css/styleguide.scss'
        }
      }
    }
  });

  grunt.registerTask('default', ['develop']);
  grunt.registerTask('develop', ['clean:dest', 'copy', 'uglify', 'sass', 'assemble', 'connect:livereload', 'watch']);
  grunt.registerTask('build', ['clean:dest', 'copy', 'uglify', 'sass', 'assemble', 'clean:post']);
  grunt.registerTask('liverel', ['clean:dest', 'copy','uglify', 'sass', 'assemble:prod', 'assemble:styleGuide']);
};
