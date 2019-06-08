import ResMock from '../../__mocks__/ResMock';
import ResponseHelper from '../ResponseHelper';

describe('ResponseHelper', () => {
  describe('.parametersError()', () => {
    let res;
    let status;
    let json;

    beforeEach(() => {
      res = new ResMock();
      status = jest.spyOn(res, 'status');
      json = jest.spyOn(res, 'json');
    });

    it('should send a server error if status code is not provided', () => {
      const error = new Error('Some error.');

      ResponseHelper.parametersError(error, res);

      expect(status).toHaveBeenCalledWith(500);
      expect(json).toHaveBeenCalledWith({
        success: false,
        error: {
          status: 500,
          message: 'Server error has occurred!',
        },
      });
    });
  });
});
