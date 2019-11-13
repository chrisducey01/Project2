module.exports = function(sequelize, DataTypes) {
  var Reward = sequelize.define("Reward", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1
      }
    }
  });
  Reward.associate = function(models) {
    // We're saying that a User should belong to an Family
    // A User can't be created without an Family due to the foreign key constraint
    Reward.belongsTo(models.Family, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Reward;
};
