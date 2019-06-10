export default class CustomerServiceMock {
  static async addCustomer() {
    return {
      customer_id: 1,
      name: 'David James',
      email: 'dav.jame@mock.com',
      password: 'DJames',
      credit_card: null,
      address_1: null,
      address_2: null,
      city: null,
      region: null,
      postal_code: null,
      country: null,
      shipping_region_id: 1,
      day_phone: null,
      eve_phone: null,
      mob_phone: null,
    };
  }
}
