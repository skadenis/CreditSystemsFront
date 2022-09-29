<template>
  <div>
    <button class="add-btn" @click="add_product">Добавить Продукт</button>
    <a-row type="flex" :gutter="24">
      <a-col :span="24" :lg="5" :md="5">
        <a-form-model-item label="Тип кредита">
          <a-select
            default-value="0"
            style="width: 100%"
            v-model="filters.type"
          >
            <a-select-option :value="0"> Все </a-select-option>
            <a-select-option :value="1"> Другое </a-select-option>
            <a-select-option :value="2">
              Потребительский кредит
            </a-select-option>
            <a-select-option :value="3"> На рефинансирование </a-select-option>
            <a-select-option :value="4"> На автомобиль </a-select-option>
            <a-select-option :value="5"> На покупку квартиры </a-select-option>
            <a-select-option :value="6">
              На строительство жилья
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-col>
      <a-col :span="24" :lg="5" :md="5">
        <a-form-model-item label="Метод погашения">
          <a-select
            default-value="0"
            style="width: 100%"
            v-model="filters.method"
          >
            <a-select-option :value="0"> Все </a-select-option>
            <a-select-option :value="1"> Дифференцированный </a-select-option>
            <a-select-option :value="2"> Аннуитетный </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-col>
      <a-col :span="24" :lg="5" :md="5">
        <a-form-model-item label="Валюта">
          <a-select
            default-value="0"
            style="width: 100%"
            v-model="filters.currency"
          >
            <a-select-option :value="0"> Все </a-select-option>
            <a-select-option :value="1"> BYN </a-select-option>
            <a-select-option :value="2"> USD </a-select-option>
            <a-select-option :value="3"> EUR </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-col>
      <a-col :span="24" :lg="5" :md="5">
        <a-form-model-item label="Форма выдачи">
          <a-select
            default-value="0"
            style="width: 100%"
            v-model="filters.receipt_form"
          >
            <a-select-option :value="0"> Все </a-select-option>
            <a-select-option :value="1"> Наличными </a-select-option>
            <a-select-option :value="2"> Банковский перевод </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-col>
    </a-row>
    <div class="table">
      <p>Продукт</p>
      <p>Тип</p>
      <p>Сумма</p>
      <p>Срок</p>
      <p>Процентная ставка</p>
    </div>
    <ProductRow
      v-for="(product, index) in filteredProducts"
      :key="index"
      :data="product"
    ></ProductRow>
  </div>
</template>

<script>
import ProductsAPI from "../../../api/ProductsAPI";
import ProductRow from "./Product/ProductRow.vue";

export default {
  props: ["BankId"],
  components: {
    ProductRow,
  },
  data() {
    return {
      products: [],
      filteredProducts: [],
      filters: {
        type: 0,
        method: 0,
        currency: 0,
        receipt_form: 0,
      },
    };
  },

  watch: {
    filters: {
      handler(val) {
        this.filterData();
      },
      deep: true,
    },
  },

  mounted() {
    this.get_products();
  },

  methods: {
    filterData: async function () {
      let products = this.products;

      if (this.filters.type !== 0) {
        products = products.filter(
          (product) => product.type === this.filters.type
        );
      }

      if (this.filters.method !== 0) {
        products = products.filter(
          (product) => product.method === this.filters.method
        );
      }

      if (this.filters.currency !== 0) {
        products = products.filter(
          (product) => product.currency === this.filters.currency
        );
      }

      if (this.filters.receipt_form !== 0) {
        products = products.filter(
          (product) => product.receipt_form === this.filters.receipt_form
        );
      }

      this.filteredProducts = products;
    },
    get_products() {
      ProductsAPI.get_banks_products(this.BankId)
        .then((response) => {
          this.products = response.data;
          this.filterData();
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    add_product() {
      this.goTo("/banks/" + this.BankId + "/product/add");
    },
  },
};
</script>

<style scoped lang="scss">
.table {
  display: flex;
  width: 100%;
  margin-top: 15px;

  p {
    box-sizing: border-box;

    font-weight: 600;
    color: #000;

    border-right: 1px solid #eee;
    white-space: nowrap;

    text-align: center;

    background: #ddd;
    padding: 10px 0;
    line-height: 14px;
    width: calc(100% / 5);
  }
}
</style>
