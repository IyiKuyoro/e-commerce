import bcrypt from 'bcrypt';

import ResponseHelper from '../helpers/ResponseHelper';
import CustomerService from '../services/CustomerService';
import tokenGenerator from '../helpers/helperFunctions';
import config from '../configs';

export default class CustomerController {
  /**
   * @description Handle customer registration
   * @param  {object} req The http request object
   * @param  {object} res The http response object
   */
  static async registerCustomer(req, res) {
    try {
      const { name, email, password } = req.body;
      const saltRounds = 10;
      const tokenDuration = '24h';

      const passwordHash = bcrypt.hashSync(password, saltRounds);

      // Save user to database
      const customer = await CustomerService.addCustomer(name, email, passwordHash);

      const payload = {
        customer: {
          schema: {
            customer_id: customer.customer_id,
            name: customer.name,
            email: customer.email,
            address_1: customer.address_1,
            address_2: customer.address_2,
            city: customer.city,
            region: customer.region,
            postal_code: customer.postal_code,
            country: customer.country,
            shipping_region_id: customer.shipping_region_id,
            day_phone: customer.day_phone,
            eve_phone: customer.eve_phone,
            mob_phone: customer.mob_phone,
            credit_card: customer.credit_card,
          },
        },
        accessToken: tokenGenerator(
          {
            id: customer.customer_id,
            name: customer.name,
            email: customer.email,
          },
          tokenDuration,
        ),
        expiresIn: tokenDuration,
      };

      ResponseHelper.successWithDataCreated(payload, `${config.URL}/customers/${customer.customer_id}`, res);
    } catch (error) {
      ResponseHelper.serverError(error, res);
    }
  }
}
