module.exports = function(sequelize, DataTypes) {
    var Chore = sequelize.define("Chore", {
      task: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 255]
        }
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 255]
        }
      },
      difficultyRating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [1, 5]
        }
      }
    });

  Chore.associate = function(models) {
    // We're saying that a Chore should belong to an User
    // A Chore can't be created without a User due to the foreign key constraint
    Chore.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Chore;
};
