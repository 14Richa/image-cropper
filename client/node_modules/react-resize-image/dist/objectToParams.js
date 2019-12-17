(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.objectToParams = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var objectToParams = function objectToParams(obj) {
    var str = '';

    for (var key in obj) {
      if (str != '') {
        str += '&';
      }
      str += key + '=' + encodeURIComponent(obj[key]);
    }

    return str;
  };

  exports.default = objectToParams;
});