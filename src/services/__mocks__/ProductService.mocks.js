export default class ProductServicesMock {
  static async getProducts() {
    return [
      {
        product_id: 1,
        name: 'Product 1',
        description: 'This is a product',
        price: 14.99,
        discounted_price: 0.0,
        image: null,
        image_2: null,
        thumbnail: 'arc-d-triomphe-thumbnail.gif',
        display: '2',
      },
    ];
  }

  static async getProductsCounts() {
    return 1;
  }
}
