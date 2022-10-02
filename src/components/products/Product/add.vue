<template>
  <div>
    <a-row type="flex" :gutter="24">
      <a-col :span="24" :lg="6" :md="24">
        <a-form-model-item label="Банк">
          <span>{{ bank.bank_name }}</span>
        </a-form-model-item>
      </a-col>
      <a-col :span="24" :lg="18" :md="24">
        <a-form-model-item label="Продукт">
          <a-input v-model="product.product_name" />
        </a-form-model-item>
      </a-col>
    </a-row>

    <a-form-model-item label="Комментарий">
      <a-textarea rows="4" v-model="product.description" />
    </a-form-model-item>

    <a-row type="flex" :gutter="24">
      <a-col :span="24" :lg="12" :md="24">
        <a-form-model-item label="Тип кредита">
          <a-select style="width: 100%" v-model="product.type">
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
      <a-col :span="24" :lg="12" :md="24">
        <a-form-model-item label="Метод погашения">
          <a-select style="width: 100%" v-model="product.method">
            <a-select-option :value="1"> Дифференцированный </a-select-option>
            <a-select-option :value="2"> Аннуитетный </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-col>

      <a-col :span="24" :lg="12" :md="24">
        <a-form-model-item label="Валюта">
          <a-select style="width: 100%" v-model="product.currency">
            <a-select-option :value="1"> BYN </a-select-option>
            <a-select-option :value="2"> USD </a-select-option>
            <a-select-option :value="3"> EUR </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-col>

      <a-col :span="24" :lg="12" :md="24">
        <a-form-model-item label="Форма выдачи">
          <a-select style="width: 100%" v-model="product.receipt_form">
            <a-select-option :value="1"> Наличными </a-select-option>
            <a-select-option :value="2"> Банковский перевод </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-col>
      <a-col :span="24" :lg="12" :md="24">
        <a-form-model-item label="Сумма кредита от">
          <a-input
            v-model="product.min_amount"
            type="number"
            step="100"
            min="0"
          />
        </a-form-model-item>
      </a-col>
      <a-col :span="24" :lg="12" :md="24">
        <a-form-model-item label="до">
          <a-input
            v-model="product.max_amount"
            type="number"
            step="100"
            min="0"
          />
        </a-form-model-item>
      </a-col>
      <a-col :span="24" :lg="12" :md="24">
        <a-form-model-item label="Срок от">
          <a-input v-model="product.min_term" type="number" step="1" min="0" />
        </a-form-model-item>
      </a-col>
      <a-col :span="24" :lg="12" :md="24">
        <a-form-model-item label="до">
          <a-input v-model="product.max_term" type="number" step="1" min="0" />
        </a-form-model-item>
      </a-col>
      <a-col :span="24" :lg="12" :md="24">
        <a-form-model-item label="Процентная ставка от">
          <a-input
            v-model="product.min_percent"
            type="number"
            step="0.1"
            min="0"
          />
        </a-form-model-item>
      </a-col>
      <a-col :span="24" :lg="12" :md="24">
        <a-form-model-item label="до">
          <a-input
            v-model="product.max_percent"
            type="number"
            step="0.1"
            min="0"
          />
        </a-form-model-item>
      </a-col>
    </a-row>

    <a-row type="flex" :gutter="24" class="buttons__block">
      <a-col :span="24" :lg="24" :md="24">
        <a-button class="button" type="primary" @click="add_product"
          >Добавить</a-button
        >
      </a-col>
    </a-row>
  </div>
</template>

<script>
import ProductsAPI from "../../../../api/ProductsAPI";
import BanksAPI from "../../../../api/BanksAPI";

export default {
  props: ["BankId"],
  data() {
    return {
      product: {
        bank_id: this.BankId,
      },
      bank: {},
    };
  },

  mounted() {
    this.get_bank();
  },

  methods: {
    async add_product() {
      this.product.product_name =
        this.bank.bank_name + " - " + this.product.product_name;
      ProductsAPI.add(this.product)
        .then((response) => {
          this.$root.$emit("createAlertGood");
          this.goTo(
            "/banks/" + this.BankId + "/product/" + response.data.data.id
          );
        })
        .catch((e) => {
          console.log(e);
        });
    },

    get_bank() {
      BanksAPI.get(this.BankId)
        .then((response) => {
          this.bank = response.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style scoped lang="scss"></style>
