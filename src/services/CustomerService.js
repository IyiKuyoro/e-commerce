import sequelize from '../database/models/sequelize';

export default class CustomerService {
  /**
   * @description This method adds a new customer to the database
   * @param  {} name
   * @param  {} email
   * @param  {} password
   */
  static async addCustomer(name, email, password) {
    const sql = `
      CALL customer_add("${name.trim()}", "${email.trim()}", "${password ? password.trim() : null}");
    `;
    const newUser = await sequelize.query(sql, { raw: false });

    if (!newUser.length > 0) {
      throw new Error('Could not create new customer');
    }

    return newUser[0];
  }

  /**
   * @description This method gets the user's login info
   * @param  {} email
   */
  static async getLoginInfo(email) {
    const sql = `CALL customer_get_login_info("${email}");`;
    const user = await sequelize.query(sql, { raw: false });

    return user[0];
  }

  /**
   * @description This method gets customer information
   * @param  {} customerId
   */
  static async getCustomer(customerId) {
    const sql = `CALL customer_get_customer(${customerId});`;
    const user = await sequelize.query(sql, { raw: false });

    return user[0];
  }

  /**
   * @description This method gets customer information by email
   * @param  {} email
   */
  static async getCustomerByEmail(email) {
    const sql = `CALL customer_get_customer_by_email("${email}");`;
    const user = await sequelize.query(sql, { raw: false });

    return user[0];
  }

  static async updateAddress(user, addressInfo) {
    let sql;
    if (addressInfo.address2) {
      sql = `
        CALL customer_update_address(${
          user.id
        }, "${addressInfo.address1.trim()}", "${addressInfo.address2.trim()}", "${addressInfo.city.trim()}", "${addressInfo.region.trim()}", "${addressInfo.postalCode.trim()}", "${addressInfo.country.trim()}", ${
        addressInfo.shippingRegionId
      })
      `;
    } else {
      sql = `
        CALL customer_update_address(${
          user.id
        }, "${addressInfo.address1.trim()}", null, "${addressInfo.city.trim()}", "${addressInfo.region.trim()}", "${addressInfo.postalCode.trim()}", "${addressInfo.country.trim()}", ${
        addressInfo.shippingRegionId
      })
      `;
    }

    await sequelize.query(sql, { raw: false });
    const result = await this.getCustomerByEmail(user.email);

    return result;
  }
}
