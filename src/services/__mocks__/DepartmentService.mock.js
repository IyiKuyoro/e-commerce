export default class DepartmentServiceMock {
  static async getDepartmentList() {
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
