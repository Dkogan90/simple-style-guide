describe('styleguide-utils', function () {

  var assert = require('assert');
  var grunt = require('grunt');
  var _sgu = require(process.cwd() + '/lib/js/styleguide-utils.js');

  describe('string functions', function () {
    it('should remove the file ending of a string', function () {
      assert.equal(_sgu.removeFileEnding('test.html'), 'test');
    });
    it('should replace a kebab case string into a spring with spaces insted of a kebab pike', function () {
      assert.equal(_sgu.replaceKebabCaseWithSpace('this-is-a-test-string'), 'this is a test string');
    });
    it('should remove an enumeration from a string', function () {
      assert.equal(_sgu.removeEnumerationFromString('1.test'), 'test');
    });
  });

  describe('handelbar helper utils', function () {
    it('should return a object with the filename and the topic', function () {
      var extracted = _sgu.extracted('resources/test.html');
      assert.equal(extracted.filename, 'test');
      assert.equal(extracted.topic, 'Test');
    });
    it('should create the template structure', function () {
      var allFiles = grunt.file.expand(['temp/templates/**/*.html']);
      var structure = _sgu.createTemplateStructure(allFiles);


      assert.equal(structure.groups.length, 2);
      assert.equal(structure.groups[0].name, 'test');
      assert.equal(structure.groups[0].singlePage, true);
      assert.equal(structure.groups[1].name, 'testgroup');
      assert.equal(structure.groups[1].singlePage, false);
    });
    describe('wrap the template content', function () {
      var allFiles = grunt.file.expand(['temp/templates/**/*.html']),
        structure = _sgu.createTemplateStructure(allFiles),
        group0 = structure.groups[0],
        group1 = structure.groups[1],
        group0Topic = group0.name.charAt(0).toUpperCase() +
          _sgu.replaceKebabCaseWithSpace(group0.name.slice(1)),
        group1Topic = group1.name.charAt(0).toUpperCase() +
          _sgu.replaceKebabCaseWithSpace(group0.name.slice(1)),
        fileContent = function (src) {
          return grunt.file.expand(src).map(grunt.file.read).join(grunt.util.normalizelf(grunt.util.linefeed));
        };

      it('should wrap the template content with a div container', function () {
        var onlyDiv = _sgu.createTemplateContent(group0, fileContent(group0.filePaths[0]), group0.filePaths[0]);

        assert.equal(onlyDiv.toString(), '<div class="container col-xs-12"><html>\n    test\n</html>\n</div>');
      });
      it('should wrap the template content with a div container and a h3 header', function () {
        var divWithHeader = _sgu.createTemplateContent(group1, fileContent(group1.filePaths[1]), group1.filePaths[0]);

        assert.equal(divWithHeader.toString(), '<div class="container col-xs-12"><h3 id="testgroup-test-grp">Test grp</h3><html>\n    test\n</html>\n</div>');
      });
      it('should warp the template with a h1 header', function () {
        var divWithHeader = _sgu.createTopicHeader(group0Topic, group0, fileContent(group0.filePaths[0]));
        assert.equal(divWithHeader.toString(), '<div class="row"><h1 class="page-header" id="test">Test</h1><html>\n    test\n</html>\n</div>');
      });
      it('should create a nav bar sub group', function () {
        var navBarSubGrp = _sgu.createNavBarSubTopics(group0, group0.filePaths[0]);
        assert.equal(navBarSubGrp.toString(), '<li><a href=\"#test-test\" data-scroll><span>Test</span></a></li>');
      });
      describe('create nav bar entries', function () {
        it('should create a nav bar entry', function () {
          var subTopics = group0.filePaths.map(function (filePath) {
            return _sgu.createNavBarSubTopics(group0, filePath);
          }).join(grunt.util.normalizelf(grunt.util.linefeed));
          var navBarEntry = _sgu.createNavBarEntry(group0, group0Topic, subTopics);
          assert.equal(navBarEntry.toString(), '<li><a href=\"#test\" data-scroll><span>Test</span></a></li>');
        });
        it('should create a nav bar sub entry', function () {
          var subTopics = group1.filePaths.map(function (filePath) {
            return _sgu.createNavBarSubTopics(group1, filePath);
          }).join(grunt.util.normalizelf(grunt.util.linefeed));
          var navBarEntry = _sgu.createNavBarEntry(group1, group1Topic, subTopics);
          assert.equal(navBarEntry.toString(), '<li><a href=\"#testgroup\" data-scroll><span>Test</span></a><ul class=\"sidebar-sub-group\"><li><a href=\"#testgroup-test-grp\" data-scroll><span>Test grp</span></a></li>\n<li><a href=\"#testgroup-test-grp\" data-scroll><span>Test grp</span></a></li></ul></li>');
        });
        it('should create the complete style guide content', function () {
          var completeStyleGuideContent = _sgu.generateStyleGuideContent('temp/templates/**/*.html');
          assert.equal(completeStyleGuideContent, '<div class=\"row\"><h1 class=\"page-header\" id=\"test\">Test</h1><div class=\"container col-xs-12\"><html>\n    test\n</html>\n</div></div>\n<div class=\"row\"><h1 class=\"page-header\" id=\"testgroup\">Testgroup</h1><div class=\"container col-xs-12\"><h3 id=\"testgroup-test-grp\">Test grp</h3><html>\n    test\n</html>\n</div>\n<div class=\"container col-xs-12\"><h3 id=\"testgroup-test-grp\">Test grp</h3><html>\n    test\n</html>\n</div></div>');
        });
        it('should create the complete style guide nav bar content', function () {
          var completeStyleGuideContent = _sgu.generatedStyleGuideNavBar('temp/templates/**/*.html');
          assert.equal(completeStyleGuideContent, '<li><a href=\"#test\" data-scroll><span>Test</span></a></li>\n<li><a href=\"#testgroup\" data-scroll><span>Testgroup</span></a><ul class=\"sidebar-sub-group\"><li><a href=\"#testgroup-test-grp\" data-scroll><span>Test grp</span></a></li>\n<li><a href=\"#testgroup-test-grp\" data-scroll><span>Test grp</span></a></li></ul></li>');
        });
      });
    })
  });

});
