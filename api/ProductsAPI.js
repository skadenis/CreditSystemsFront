import BaseAPI from "./BaseAPI";

class ProductsAPI extends BaseAPI {
  get(id) {
    return this.axios.get("/banks/product/" + id);
  }

  get_all() {
    return this.axios.get("/banks/product");
  }

  get_banks_products(BankId) {
    return this.axios.get("/banks/product/list/" + BankId);
  }

  get_filtered(data) {
    console.log(data);
    return this.axios.post("banks/product/filtered", data);
  }

  // get_bank_name(id) {
  //   console.log(id);
  //   return this.axios.get("/banks/product/name/" + id);
  // }

  add(data) {
    return this.axios.post("banks/product/add", data);
  }

  edit(data) {
    return this.axios.put("banks/product/edit", data);
  }

  delete(data) {
    return this.axios.put("banks/product/delete", data);
  }
}

export default new ProductsAPI();
