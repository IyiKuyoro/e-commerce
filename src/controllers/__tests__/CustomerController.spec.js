import CustomerController from '../CustomerController';
import ResMock from '../../__mocks__/ResMock';
import CustomerServices from '../../services/CustomerService';
import CustomerServiceMock from '../../services/__mocks__/CustomerService.mock';

describe('CustomerController', () => {
  describe('.registerCustomer()', () => {
    let res;
    let status;
    let json;

    beforeEach(() => {
      res = new ResMock();
      status = jest.spyOn(res, 'status');
      json = jest.spyOn(res, 'json');
    });

    it('should add a new customer to the database', async () => {
      const req = {
        body: {
          name: 'John Doe',
          email: 'john.doe@test.com',
          password: 'xxxxxxxxxxxx',
        },
      };
      jest.spyOn(CustomerServices, 'addCustomer').mockImplementation(CustomerServiceMock.addCustomer);

      await CustomerController.registerCustomer(req, res);

      expect(status).toHaveBeenCalledWith(201);
      expect(json).toHaveBeenCalledTimes(1);
    });

    it('should respond with error if one occurs', async () => {
      const req = {
        body: {
          name: 'John Doe',
          email: 'john.doe@test.com',
          password: 'xxxxxxxxxxxx',
        },
      };
      jest.spyOn(CustomerServices, 'addCustomer').mockImplementation(() => {
        throw new Error('Server error');
      });

      await CustomerController.registerCustomer(req, res);

      expect(status).toHaveBeenCalledWith(500);
      expect(json).toHaveBeenCalledWith({
        success: false,
        error: {
          message: 'Server error has occurred!',
          status: 500,
        },
      });
    });
  });
});
