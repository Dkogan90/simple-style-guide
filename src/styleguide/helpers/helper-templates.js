(function () {
  var _sgu = require('styleguide-utils');
  module.exports.register = function (Handlebars, options) {
    Handlebars.registerHelper("templates", function (src) {
      return new Handlebars.SafeString(_sgu.generateStyleGuideContent(src));
    });
  };
}).call(this);
