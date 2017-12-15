'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

exports.default = async () => {
  let maxReconnects = 20;
  let connected = false;
  const sequelize = new _sequelize2.default(process.env.TEST_DB || 'slack', 'postgres', 'postgres', {
    dialect: 'postgres',
    operatorsAliases: _sequelize2.default.Op,
    host: process.env.DB_HOST || 'localhost',
    define: {
      underscored: true
    }
  });

  while (!connected && maxReconnects) {
    try {
      // eslint-disable-next-line no-await-in-loop
      await sequelize.authenticate();
      connected = true;
    } catch (err) {
      console.log('reconnecting in 5 seconds');
      // eslint-disable-next-line no-await-in-loop
      await sleep(5000);
      maxReconnects -= 1;
    }
  }

  if (!connected) {
    return null;
  }

  const models = {
    User: sequelize.import('./user'),
    Channel: sequelize.import('./channel'),
    Message: sequelize.import('./message'),
    Team: sequelize.import('./team'),
    Member: sequelize.import('./member'),
    DirectMessage: sequelize.import('./directMessage'),
    PCMember: sequelize.import('./pcmember')
  };

  Object.keys(models).forEach(modelName => {
    if ('associate' in models[modelName]) {
      models[modelName].associate(models);
    }
  });

  models.sequelize = sequelize;
  models.Sequelize = _sequelize2.default;
  models.op = _sequelize2.default.Op;

  return models;
};