module.exports = function(sequelize, DataTypes) {
  var Family = sequelize.define("Family", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Family.associate = function(models) {
    // Associating Family with Users
    // When an Family is deleted, also delete any associated Users
    Family.hasMany(models.User, {
      onDelete: "cascade"
    });
    Family.hasMany(models.Reward, {
      onDelete: "cascade"
    });
  };

  return Family;
};
