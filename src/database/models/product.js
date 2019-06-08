module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      price: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2),
      },
      discounted_price: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: '0.00',
      },
      image: {
        type: DataTypes.STRING,
      },
      image_2: {
        type: DataTypes.STRING,
      },
      thumbnail: {
        type: DataTypes.STRING,
      },
      display: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: '0',
      },
    },
    {},
  );
  Product.associate = () => {};
  return Product;
};
