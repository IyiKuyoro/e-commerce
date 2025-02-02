import ProductService from '../ProductServices';

describe('ProductService', () => {
  describe('.getProducts()', () => {
    it('should get all products that exists', async () => {
      const rows = await ProductService.getProducts();

      expect(rows[0].name).toEqual('Haute Couture');
      expect(rows.length).toEqual(20);
    });
  });

  describe('.getProductsCounts()', () => {
    it('should get all products that exists', async () => {
      const counts = await ProductService.getProductsCounts();

      expect(counts).toEqual(101);
    });
  });

  describe('.getProductDetails()', () => {
    it('should get the product', async () => {
      const product = await ProductService.getProductDetails(1);

      expect(product.name).toEqual("Arc d'Triomphe");
    });
  });
});
