var grunt = require('grunt');

var styleGuideUtils = {
  removeFileEnding: function (string) {
    return string.replace(/\.(.*)/, '').toString();
  },
  replaceKebabCaseWithSpace: function (string) {
    return string.replace(/-/g, ' ').toString();
  },
  removeEnumerationFromString: function (string) {
    return string.replace(/[0-9][-.]?/, '').toString();
  },
  extracted: function (filePath) {
    var path = require('path');
    var filename = styleGuideUtils.removeEnumerationFromString(path.basename(filePath, '.html'));
    var topic = filename.charAt(0).toUpperCase() + styleGuideUtils.replaceKebabCaseWithSpace(filename.slice(1));
    return {filename: filename, topic: topic};
  },
  createTemplateStructure: function (allFiles) {
    var templateStructure = {
      groups: []
    };

    allFiles.map(function (path) {
      var groupName = styleGuideUtils.removeFileEnding(path.replace(/^.*\/templates\//, '').split('/')[0]);
      if (templateStructure.groups.some(function (group) {
          return group.name === groupName
        })) {
        var foundGroup = templateStructure.groups.filter(function (group) {
          return group.name === groupName
        });
        foundGroup[0].filePaths.push(path);
        foundGroup[0].singlePage = false;
      } else {
        var newGroup = {
          name: groupName,
          filePaths: [path],
          singlePage: true
        };
        templateStructure.groups.push(newGroup);
      }
    });

    return templateStructure;
  },
  createTemplateContent: function (group, fileContent, filePath) {
    var __ret = this.extracted(filePath);
    if (group.singlePage === true) {
      return '<div class="container col-xs-12">' + fileContent + '</div>'
    } else {
      return '<div class="container col-xs-12"><h3 id="' + group.name + '-' + __ret.filename + '">' +
        __ret.topic + '</h3>' + fileContent +
        '</div>'
    }
  },
  createTopicHeader: function (groupTopic, group, templateContent) {
    return '<div class="row"><h1 class="page-header" id="' + group.name + '">' + groupTopic + '</h1>' +
      templateContent + '</div>'
  },
  createNavBarSubTopics: function (group, filePath) {
    var __ret = this.extracted(filePath);
    return '<li><a href="#' + group.name + '-' + __ret.filename + '" data-scroll><span>' + __ret.topic + '</span></a></li>'
  },
  createNavBarEntry: function (group, groupTopic, subTopics) {
    if (group.singlePage === true) {
      return '<li><a href="#' + group.name + '" data-scroll><span>' + groupTopic + '</span></a></li>'
    } else {
      return '<li><a href="#' + group.name + '" data-scroll><span>' + groupTopic + '</span></a><ul class="sidebar-sub-group">' + subTopics + '</ul></li>'
    }
  },
  getFileContent: function (src) {
    return grunt.file.expand(src).map(grunt.file.read).join(grunt.util.normalizelf(grunt.util.linefeed));
  },
  generateStyleGuideContent: function (src) {
    var self = this;
    var overallContent;
    var originalPaths = grunt.file.expand(src);
    var templateStructure = this.createTemplateStructure(originalPaths);

    overallContent = templateStructure.groups.map(function (group) {
      var templateContent = group.filePaths.map(function (filePath) {
        return self.createTemplateContent(group, self.getFileContent(filePath), filePath)
      }).join(grunt.util.normalizelf(grunt.util.linefeed));

      var groupTopic = group.name.charAt(0).toUpperCase() +
        self.replaceKebabCaseWithSpace(group.name.slice(1));
      return self.createTopicHeader(groupTopic, group, templateContent);

    }).join(grunt.util.normalizelf(grunt.util.linefeed));
    return overallContent;
  },
  generatedStyleGuideNavBar: function (src) {
    var self = this;
    var overallContent;
    var originalPaths = grunt.file.expand(src);
    var templateStructure = self.createTemplateStructure(originalPaths);

    overallContent = templateStructure.groups.map(function (group) {
      var subTopics = group.filePaths.map(function (filePath) {
        return self.createNavBarSubTopics(group, filePath);
      }).join(grunt.util.normalizelf(grunt.util.linefeed));

      var groupTopic = group.name.charAt(0).toUpperCase() + self.replaceKebabCaseWithSpace(group.name.slice(1));
      return self.createNavBarEntry(group,groupTopic,subTopics)
    }).join(grunt.util.normalizelf(grunt.util.linefeed));
    return overallContent;
  }
};

module.exports = styleGuideUtils;
