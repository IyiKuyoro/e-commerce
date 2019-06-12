export default class CategoryServiceMock {
  /**
   * @description Get a the list of categories
   */
  static async getCategories() {
    return [
      {
        department_id: 1,
        name: 'Gold',
      },
      {
        department_id: 2,
        name: 'Shoes',
      },
    ];
  }
}
