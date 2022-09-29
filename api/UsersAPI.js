import BaseAPI from "./BaseAPI";

class UsersAPI extends BaseAPI {
  auth(data) {
    return this.axios.post("/auth", data);
  }
}

export default new UsersAPI();
