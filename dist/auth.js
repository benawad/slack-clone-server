'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tryLogin = exports.refreshTokens = exports.createTokens = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createTokens = exports.createTokens = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(user, secret, secret2) {
    var createToken, createRefreshToken;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            createToken = _jsonwebtoken2.default.sign({
              user: _lodash2.default.pick(user, ['id', 'username'])
            }, secret, {
              expiresIn: '1h'
            });
            createRefreshToken = _jsonwebtoken2.default.sign({
              user: _lodash2.default.pick(user, 'id')
            }, secret2, {
              expiresIn: '7d'
            });
            return _context.abrupt('return', [createToken, createRefreshToken]);

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function createTokens(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var refreshTokens = exports.refreshTokens = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(token, refreshToken, models, SECRET, SECRET2) {
    var userId, _jwt$decode, id, user, refreshSecret, _ref3, _ref4, newToken, newRefreshToken;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            userId = 0;
            _context2.prev = 1;
            _jwt$decode = _jsonwebtoken2.default.decode(refreshToken), id = _jwt$decode.user.id;

            userId = id;
            _context2.next = 9;
            break;

          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2['catch'](1);
            return _context2.abrupt('return', {});

          case 9:
            if (userId) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt('return', {});

          case 11:
            _context2.next = 13;
            return models.User.findOne({ where: { id: userId }, raw: true });

          case 13:
            user = _context2.sent;

            if (user) {
              _context2.next = 16;
              break;
            }

            return _context2.abrupt('return', {});

          case 16:
            refreshSecret = user.password + SECRET2;
            _context2.prev = 17;

            _jsonwebtoken2.default.verify(refreshToken, refreshSecret);
            _context2.next = 24;
            break;

          case 21:
            _context2.prev = 21;
            _context2.t1 = _context2['catch'](17);
            return _context2.abrupt('return', {});

          case 24:
            _context2.next = 26;
            return createTokens(user, SECRET, refreshSecret);

          case 26:
            _ref3 = _context2.sent;
            _ref4 = (0, _slicedToArray3.default)(_ref3, 2);
            newToken = _ref4[0];
            newRefreshToken = _ref4[1];
            return _context2.abrupt('return', {
              token: newToken,
              refreshToken: newRefreshToken,
              user: user
            });

          case 31:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[1, 6], [17, 21]]);
  }));

  return function refreshTokens(_x4, _x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();

var tryLogin = exports.tryLogin = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(email, password, models, SECRET, SECRET2) {
    var user, valid, refreshTokenSecret, _ref6, _ref7, token, refreshToken;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return models.User.findOne({ where: { email: email }, raw: true });

          case 2:
            user = _context3.sent;

            if (user) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt('return', {
              ok: false,
              errors: [{ path: 'email', message: 'Wrong email' }]
            });

          case 5:
            _context3.next = 7;
            return _bcrypt2.default.compare(password, user.password);

          case 7:
            valid = _context3.sent;

            if (valid) {
              _context3.next = 10;
              break;
            }

            return _context3.abrupt('return', {
              ok: false,
              errors: [{ path: 'password', message: 'Wrong password' }]
            });

          case 10:
            refreshTokenSecret = user.password + SECRET2;
            _context3.next = 13;
            return createTokens(user, SECRET, refreshTokenSecret);

          case 13:
            _ref6 = _context3.sent;
            _ref7 = (0, _slicedToArray3.default)(_ref6, 2);
            token = _ref7[0];
            refreshToken = _ref7[1];
            return _context3.abrupt('return', {
              ok: true,
              token: token,
              refreshToken: refreshToken
            });

          case 18:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function tryLogin(_x9, _x10, _x11, _x12, _x13) {
    return _ref5.apply(this, arguments);
  };
}();