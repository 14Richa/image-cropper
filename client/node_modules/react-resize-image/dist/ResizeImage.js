(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', './getRSZioUrl'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('./getRSZioUrl'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.getRSZioUrl);
    global.ResizeImage = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _getRSZioUrl) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _getRSZioUrl2 = _interopRequireDefault(_getRSZioUrl);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var ResizeImage = function ResizeImage(props) {
    var src = props.src,
        options = props.options,
        style = props.style,
        alt = props.alt,
        resizeActive = props.resizeActive;


    return _react2.default.createElement('img', {
      src: resizeActive ? (0, _getRSZioUrl2.default)(src, options) : src,
      alt: alt,
      style: style
    });
  };

  ResizeImage.propTypes = {
    src: _propTypes2.default.string.isRequired,
    alt: _propTypes2.default.string,
    options: _propTypes2.default.object,
    style: _propTypes2.default.object,
    resizeActive: _propTypes2.default.bool
  };

  ResizeImage.defaultProps = {
    resizeActive: true
  };

  exports.default = ResizeImage;
});