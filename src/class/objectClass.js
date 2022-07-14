class objectClass {
  constructor() {
    this.object = [];
    this.type = "object";
  }
  async getAll() {
    return this.object;
  }
  async getOne(id) {
    return this.object[id];
  }
  async create(object) {
    this.object.push(object);
    return object;
  }
  async update(id, object) {
    this.object[id] = object;
    return object;
  }
  async delete(id) {
    this.object.splice(id, 1);
  }
}
export default objectClass;
