'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlRedisSubscriptions = require('graphql-redis-subscriptions');

exports.default = new _graphqlRedisSubscriptions.RedisPubSub({
  connection: {
    host: '127.0.0.1',
    port: 6379,
    retry_strategy: function retry_strategy(options) {
      return Math.max(options.attempt * 100, 3000);
    }
  }
});