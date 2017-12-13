'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = (sequelize, DataTypes) => {
  const Member = sequelize.define('member', {
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  return Member;
};