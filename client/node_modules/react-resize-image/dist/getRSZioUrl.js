(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './objectToParams'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./objectToParams'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.objectToParams);
    global.getRSZioUrl = mod.exports;
  }
})(this, function (exports, _objectToParams) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _objectToParams2 = _interopRequireDefault(_objectToParams);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var getRSZioUrl = function getRSZioUrl(src, options) {
    var result = src;

    // if is link
    if (/^https?:\/\//.test(src)) {
      result = result.replace(/^(https?:\/\/)/, '$1rsz.io/');
      if (options) {
        result += '?' + (0, _objectToParams2.default)(options);
      }
    }
    return result;
  };

  exports.default = getRSZioUrl;
});