<template>
  <div>
    <a-row type="flex" :gutter="24">
      <a-col :span="24" :lg="8" :md="24">
        <a-form-model-item label="Статус" v-if="lead.status === 1">
          {{ lead.status | leadStatusName }}
        </a-form-model-item>
        <a-form-model-item label="Статус" v-if="lead.status !== 1">
          <a-select style="width: 100%" v-model="lead.status">
            <a-select-option :value="2"> Просмотрен </a-select-option>
            <a-select-option :value="3"> Обработан </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-col>
      <a-col :span="24" :lg="12" :md="24">
        <a-form-model-item label="Платежный уровень">
          <span v-if="lead.payment_level" class="payment-level">{{
            lead.payment_level
          }}</span>
          <span class="calculator-link" @click="open_calculator(lead.id)">
            Перейти на страницу рассчета П/У
          </span>
        </a-form-model-item></a-col
      >
      <a-col :span="24" :lg="8" :md="24">
        <a-form-model-item label="Номер телефона">
          <a-input
            :style="'border-color:' + color"
            v-model="lead.phone"
            v-maska="'+375(##)###-##-##'"
            placeholder="+375(__)___-__-__"
          />
        </a-form-model-item>
      </a-col>
      <a-col :span="24" :lg="8" :md="24">
        <a-form-model-item label="Фамилия">
          <a-input v-model="lead.lastname" /> </a-form-model-item
      ></a-col>
      <a-col :span="24" :lg="8" :md="24">
        <a-form-model-item label="Имя">
          <a-input v-model="lead.name" /> </a-form-model-item
      ></a-col>

      <a-col :span="24" :lg="8" :md="24">
        <a-form-model-item label="Желаемая сумма">
          <a-input
            type="number"
            v-model="lead.desired_amount"
          /> </a-form-model-item
      ></a-col>
      <a-col :span="24" :lg="8" :md="24">
        <a-form-model-item label="Срок">
          <a-input type="number" v-model="lead.term" /> </a-form-model-item
      ></a-col>
      <a-col :span="24" :lg="8" :md="24">
        <a-form-model-item label="Цель кредита">
          <a-select
            style="width: 100%"
            @change="get_filtered"
            v-model="lead.credit_target"
          >
            <a-select-option :value="1"> Не выбрано </a-select-option>
            <a-select-option :value="2">
              Потребительский кредит
            </a-select-option>
            <a-select-option :value="3">
              Рефинансирование текущего кредита
            </a-select-option>
            <a-select-option :value="4"> На автомобиль </a-select-option>
            <a-select-option :value="5"> На покупку квартиры </a-select-option>
            <a-select-option :value="6">
              На строительство жилья
            </a-select-option>
          </a-select>
        </a-form-model-item></a-col
      >
    </a-row>

    <a-row type="flex" :gutter="24" class="buttons__block">
      <a-col :span="24" :lg="12" :md="24">
        <a-button
          class="button"
          type="primary"
          @click="
            lead.phone.length === 17 && lead.desired_amount
              ? edit_lead()
              : make_error()
          "
          >Сохранить</a-button
        >
      </a-col>
      <a-col :span="24" :lg="12" :md="24">
        <a-button class="button" type="danger" @click="showModalDelete"
          >Удалить</a-button
        >
      </a-col>
    </a-row>

    <a-modal :visible="visible" @ok="delete_lead" @cancel="hideModalDelete">
      Удалить?
    </a-modal>
    <a-form-model-item label="Предлагаемые продукты">
      <div class="table">
        <p>Продукт</p>
        <p>Тип</p>
        <p>Сумма</p>
        <p>Срок</p>
        <p>Процентная ставка</p>
      </div>
      <ProductRow
        v-for="(product, index) in products"
        :product="product"
        :key="index"
      ></ProductRow>
    </a-form-model-item>
  </div>
</template>

<script>
import LeadsAPI from "../../../../api/LeadsAPI";
import ProductsAPI from "../../../../api/ProductsAPI";
import ProductRow from "../../products/Product/ProductRow.vue";
import { maska } from "maska";

export default {
  components: {
    ProductRow,
  },
  props: ["LeadId"],
  directives: { maska },
  data() {
    return {
      lead: {
        credit_target: null,
      },
      products: [],
      visible: false,
      color: "",
    };
  },

  mounted() {
    this.get_lead();
  },

  methods: {
    get_lead() {
      LeadsAPI.get(this.LeadId)
        .then((response) => {
          this.lead = response.data.data;
          this.get_filtered();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    async get_filtered() {
      if (this.lead.credit_target !== 1) {
        ProductsAPI.get_filtered(this.lead)
          .then((response) => {
            this.products = response.data;
          })
          .catch((e) => {
            console.log(e);
          });
      } else this.get_products();
    },

    get_products() {
      ProductsAPI.get_all()
        .then((response) => {
          this.products = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async edit_lead() {
      LeadsAPI.edit(this.lead)
        .then((response) => {
          this.$root.$emit("createAlertGood");
          this.goTo("/leads/");
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async delete_lead() {
      LeadsAPI.delete(this.lead)
        .then((response) => {
          this.$root.$emit("createAlertGood");
          this.goTo("/leads/");
        })
        .catch((e) => {
          console.log(e);
        });
    },
    make_error() {
      this.color = "red";
      this.$root.$emit("createAlertError");
    },
    showModalDelete() {
      this.visible = true;
    },
    hideModalDelete() {
      this.visible = false;
    },
    open_calculator(id) {
      this.goTo("/calculator/" + id);
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
.payment-level {
  color: black;
  margin-right: 20px;
  font-weight: 600;
}
.calculator-link {
  color: rgb(37, 147, 252);
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}
</style>
