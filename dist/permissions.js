'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.directMessageSubscription = exports.requiresTeamAccess = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createResolver = function createResolver(resolver) {
  var baseResolver = resolver;
  baseResolver.createResolver = function (childResolver) {
    var newResolver = function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(parent, args, context, info) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return resolver(parent, args, context, info);

              case 2:
                return _context.abrupt('return', childResolver(parent, args, context, info));

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function newResolver(_x, _x2, _x3, _x4) {
        return _ref.apply(this, arguments);
      };
    }();
    return createResolver(newResolver);
  };
  return baseResolver;
};

// requiresAuth
exports.default = createResolver(function (parent, args, _ref2) {
  var user = _ref2.user;

  if (!user || !user.id) {
    throw new Error('Not authenticated');
  }
});
var requiresTeamAccess = exports.requiresTeamAccess = createResolver(function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(parent, _ref4, _ref5) {
    var channelId = _ref4.channelId;
    var user = _ref5.user,
        models = _ref5.models;
    var channel, member;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(!user || !user.id)) {
              _context2.next = 2;
              break;
            }

            throw new Error('Not authenticated');

          case 2:
            _context2.next = 4;
            return models.Channel.findOne({ where: { id: channelId } });

          case 4:
            channel = _context2.sent;
            _context2.next = 7;
            return models.Member.findOne({
              where: { teamId: channel.teamId, userId: user.id }
            });

          case 7:
            member = _context2.sent;

            if (member) {
              _context2.next = 10;
              break;
            }

            throw new Error("You have to be a member of the team to subcribe to it's messages");

          case 10:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}());

var directMessageSubscription = exports.directMessageSubscription = createResolver(function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(parent, _ref7, _ref8) {
    var teamId = _ref7.teamId,
        userId = _ref7.userId;
    var user = _ref8.user,
        models = _ref8.models;
    var members;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!(!user || !user.id)) {
              _context3.next = 2;
              break;
            }

            throw new Error('Not authenticated');

          case 2:
            _context3.next = 4;
            return models.Member.findAll({
              where: (0, _defineProperty3.default)({
                teamId: teamId
              }, models.sequelize.Op.or, [{ userId: userId }, { userId: user.id }])
            });

          case 4:
            members = _context3.sent;

            if (!(members.length !== 2)) {
              _context3.next = 7;
              break;
            }

            throw new Error('Something went wrong');

          case 7:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x8, _x9, _x10) {
    return _ref6.apply(this, arguments);
  };
}());