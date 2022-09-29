import BaseAPI from "./BaseAPI";

class LeadsAPI extends BaseAPI {
  get(id) {
    return this.axios.get("/leads/" + id);
  }

  get_all() {
    return this.axios.get("/leads");
  }

  get_filtered(data) {
    return this.axios.post("/leads/filtered", data);
  }

  add(data) {
    return this.axios.post("/leads/add", data);
  }

  edit(data) {
    return this.axios.put("/leads/edit", data);
  }

  delete(data) {
    return this.axios.put("/leads/delete", data);
  }
}

export default new LeadsAPI();
