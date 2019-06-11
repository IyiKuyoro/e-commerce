import ResMock from '../../__mocks__/ResMock';
import CustomerMiddlewares from '../CustomerMiddlewares';
import CustomerService from '../../services/CustomerService';

describe('CustomerMiddlewares', () => {
  describe('.validateParams', () => {
    let res;
    let status;
    let json;

    beforeEach(() => {
      res = new ResMock();
      status = jest.spyOn(res, 'status');
      json = jest.spyOn(res, 'json');
    });

    it('should get reject invalid parameters', () => {
      const req = {
        body: {
          name: 'John0Doe',
          email: 'john.doe@tes=t.com',
          password: 'xxxxxxxxxxxx',
        },
      };
      const next = jest.fn();

      CustomerMiddlewares.validateParams(req, res, next);

      expect(status).toHaveBeenCalledWith(400);
      expect(json).toHaveBeenCalledWith({
        success: false,
        error: {
          status: 400,
          code: 'USR_10',
          message: 'Some parameters passed are not valid',
          fields: ['name', 'email'],
        },
      });
    });

    it('should call the next middleware if parameters are valid', () => {
      const req = {
        body: {
          name: 'John Doe',
          email: 'john.doe@test.com',
          password: 'xxxxxxxxxxxx',
        },
      };
      const next = jest.fn();

      CustomerMiddlewares.validateParams(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
    });
  });

  describe('.checkRequiredRegParams()', () => {
    let res;
    let status;
    let json;

    beforeEach(() => {
      res = new ResMock();
      status = jest.spyOn(res, 'status');
      json = jest.spyOn(res, 'json');
    });

    it('should throw an error if params are missing', () => {
      const req = {
        body: {
          password: '     ',
        },
      };
      const next = jest.fn();

      CustomerMiddlewares.checkRequiredRegParams(req, res, next);

      expect(status).toHaveBeenCalledWith(400);
      expect(json).toHaveBeenCalledWith({
        success: false,
        error: {
          status: 400,
          code: 'USR_10',
          message: 'Some required params are missing from the request body',
          fields: ['name', 'email', 'password'],
        },
      });
    });

    it('should call next middleware if all parameters are passed', () => {
      const req = {
        body: {
          name: 'John Doe',
          email: 'John.doe@test.com',
          password: 'xxxxxxxxxxxx',
        },
      };
      const next = jest.fn();

      CustomerMiddlewares.checkRequiredRegParams(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
    });
  });

  describe('.checkAvailableEmail()', () => {
    let res;
    let status;
    let json;

    beforeEach(() => {
      res = new ResMock();
      status = jest.spyOn(res, 'status');
      json = jest.spyOn(res, 'json');
    });

    it('should throw an error if email is in use', async () => {
      const req = {
        body: {
          email: 'john.doe@test.com',
        },
      };
      const next = jest.fn();

      jest.spyOn(CustomerService, 'getLoginInfo').mockImplementation(async () => ({
        customer_id: 1,
        name: 'name',
        email: 'user@test.com',
        password: 'password',
      }));

      await CustomerMiddlewares.checkAvailableEmail(req, res, next);

      expect(status).toHaveBeenCalledWith(409);
      expect(json).toHaveBeenCalledWith({
        success: false,
        error: {
          status: 409,
          code: 'USR_4',
          message: 'This email is already in use',
          fields: ['email'],
        },
      });
    });

    it('should call next middleware if email is not in use', async () => {
      const req = {
        body: {
          email: 'John.doe@test.com',
        },
      };
      const next = jest.fn();

      jest.spyOn(CustomerService, 'getLoginInfo').mockImplementation(async () => undefined);

      await CustomerMiddlewares.checkAvailableEmail(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
    });
  });

  describe('.checkRequiredLoginParams()', () => {
    let res;
    let status;
    let json;

    beforeEach(() => {
      res = new ResMock();
      status = jest.spyOn(res, 'status');
      json = jest.spyOn(res, 'json');
    });

    it('should throw an error if parameters are missing', () => {
      const req = {
        body: {},
      };
      const next = jest.fn();

      CustomerMiddlewares.checkRequiredLoginParams(req, res, next);

      expect(status).toHaveBeenCalledWith(400);
      expect(json).toHaveBeenCalledWith({
        success: false,
        error: {
          status: 400,
          code: 'USR_10',
          message: 'Some required parameters are missing from the request body',
          fields: ['email', 'password'],
        },
      });
    });

    it('should call the next middleware if the required parameters are passed', () => {
      const req = {
        body: {
          email: 'j.doe@test.com',
          password: 'xxxxxxxxxxxxx',
        },
      };
      const next = jest.fn();

      CustomerMiddlewares.checkRequiredLoginParams(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
    });
  });

  describe('.validLoginParams', () => {
    let res;
    let status;
    let json;

    beforeEach(() => {
      res = new ResMock();
      status = jest.spyOn(res, 'status');
      json = jest.spyOn(res, 'json');
    });

    it('should throw an error for an invalid email', () => {
      const req = {
        body: {
          email: 'j.doetest.com',
          password: 'xxxxxxxxxxxxx',
        },
      };
      const next = jest.fn();

      CustomerMiddlewares.validLoginParams(req, res, next);

      expect(status).toHaveBeenCalledWith(400);
      expect(json).toHaveBeenCalledWith({
        success: false,
        error: {
          status: 400,
          code: 'USR_10',
          message: 'Some parameters are not valid',
          fields: ['email'],
        },
      });
    });

    it('should call the next middleware if the email is valid', () => {
      const req = {
        body: {
          email: 'j.doe@test.com',
          password: 'xxxxxxxxxxxxx',
        },
      };
      const next = jest.fn();

      CustomerMiddlewares.validLoginParams(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
    });
  });
});
