class IDService {
  constructor () {
    this.id = 1;
  }

  setId (id) {
    this.id = id;
  }

  getId () {
    return this.id++;
  }
}

export default new IDService();