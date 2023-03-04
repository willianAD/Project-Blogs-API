module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
  },
  {
    timestamps: false,
    underscored: true,
    tableName: 'categories',
  });

  // Category.associate = (models) => {
  //   User.hasMany(models.BlogPost,
  //     { foreignKey: 'categoryId', as: 'BlogPosts' });
  // };

  return Category;
};
