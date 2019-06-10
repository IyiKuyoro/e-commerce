import CustomerService from '../CustomerService';
import sequelize from '../../database/models/sequelize';

describe('UserService', () => {
  describe('.addUser()', () => {
    let customerId;

    it('should return the newly added user', async () => {
      const user = await CustomerService.addCustomer('David James', 'david.james@test.com', 'DJames');

      customerId = user.customer_id;
      expect(user.email).toEqual('david.james@test.com');
    });

    afterAll(async () => {
      await sequelize.query(
        `DELETE FROM customer
        WHERE customer_id = ${customerId};`,
      );
    });
  });
});
