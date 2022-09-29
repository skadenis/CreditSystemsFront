import BaseAPI from "./BaseAPI";

class BanksAPI extends BaseAPI {
  get(id) {
    return this.axios.get("/banks/" + id);
  }

  get_all() {
    return this.axios.get("/banks");
  }

  add(data) {
    return this.axios.post("/banks/add", data);
  }

  edit(data) {
    return this.axios.put("/banks/edit", data);
  }

  delete(data) {
    return this.axios.put("/banks/delete", data);
  }
}

export default new BanksAPI();
