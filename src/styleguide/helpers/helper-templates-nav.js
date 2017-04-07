(function () {
  var _sgu = require('../../../lib/js/styleguide-utils');
  module.exports.register = function (Handlebars, options) {
    Handlebars.registerHelper("templates-nav", function (src) {
      return new Handlebars.SafeString(_sgu.generatedStyleGuideNavBar(src));
    });
  };
}).call(this);
