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
    },
    monday: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    tuesday: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    wednesday: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    thursday: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    friday: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
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
