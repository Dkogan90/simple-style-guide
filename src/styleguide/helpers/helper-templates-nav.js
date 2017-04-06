(function () {
  var _sgu = require('styleguide-utils');
  module.exports.register = function (Handlebars, options) {
    Handlebars.registerHelper("templates-nav", function (src) {
      return new Handlebars.SafeString(_sgu.generatedStyleGuideNavBar(src));
    });
  };
}).call(this);
