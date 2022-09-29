import axios from "axios";
import Cookie from "js-cookie";

export default class BaseApi {
  constructor() {
    let Cookies = Cookie.get();

    this.axios = axios.create({
      baseURL: "http://localhost:3000",
      // baseURL: "https://blogersbackend.gastrosoft.by",
      headers: { Authorization: `Token ${Cookies.token}` },
    });
  }

  refreshData() {
    window.location.reload();
  }
}
