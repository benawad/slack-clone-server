export default (sequelize, DataTypes) => {
  const Channel = sequelize.define('channel', {
    name: DataTypes.STRING,
    public: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    dm: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  Channel.associate = (models) => {
    // 1:M
    Channel.belongsTo(models.Team, {
      foreignKey: {
        name: 'teamId',
        field: 'team_id',
      },
    });
    // N:M
    Channel.belongsToMany(models.User, {
      through: 'channel_member',
      foreignKey: {
        name: 'channelId',
        field: 'channel_id',
      },
    });

    Channel.belongsToMany(models.User, {
      through: models.PCMember,
      foreignKey: {
        name: 'channelId',
        field: 'channel_id',
      },
    });
  };

  return Channel;
};
