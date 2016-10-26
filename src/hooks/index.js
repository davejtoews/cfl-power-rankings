'use strict';

// Add any common hooks you want to share across services in here.
// 
// Below is an example of how a hook is written and exported. Please
// see http://docs.feathersjs.com/hooks/readme.html for more details
// on hooks.

exports.isAdmin = function(options) {
  return function(hook) {
	if (!hook.params.user || !hook.params.user.admin) {
		throw new _feathersErrors2.default.NotAuthenticated('Information only available to admin.');
	}
  };
};

var _feathersErrors = require('feathers-errors');

var _feathersErrors2 = _interopRequireDefault(_feathersErrors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }