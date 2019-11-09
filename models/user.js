module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    }
  });
  
  User.associate = function(models) {
    // We're saying that a User should belong to an Family
    // A User can't be created without an Family due to the foreign key constraint
    User.belongsTo(models.Family, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  
  return User;
};