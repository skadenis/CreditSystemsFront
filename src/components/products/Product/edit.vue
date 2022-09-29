<template>
  <div>
    <a-form-model-item label="Продукт">
      <a-input v-model="product.product_name" />
    </a-form-model-item>

    <a-form-model-item label="Комментарий">
      <a-textarea rows="4" v-model="product.description" />
    </a-form-model-item>

    <a-row type="flex" :gutter="24">
      <a-col :span="24" :lg="12" :md="24">
        <a-form-model-item label="Тип кредита">
          <a-select
            @change="get_filtered"
            style="width: 100%"
            v-model="product.type"
          >
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
      <a-col :span="24" :lg="12" :md="24">
        <a-button class="button" type="primary" @click="edit_product"
          >Сохранить</a-button
        >
      </a-col>
      <a-col :span="24" :lg="12" :md="24">
        <a-button class="button" type="danger" @click="showModalDelete"
          >Удалить</a-button
        >
      </a-col>
    </a-row>

    <a-modal :visible="visible" @ok="delete_product" @cancel="hideModalDelete">
      Удалить?
    </a-modal>
    <a-form-model-item label="Лиды соответствующие критериям">
      <div class="table">
        <p>№</p>
        <p>Статус</p>
        <p>Номер телефона</p>
        <p>Фамилия</p>
        <p>Имя</p>
        <p>П/У</p>
      </div>
      <LeadRow
        v-for="(lead, index) in leads"
        :index="index"
        :data="lead"
        :key="index"
      ></LeadRow>
    </a-form-model-item>
  </div>
</template>

<script>
import LeadsAPI from "../../../../api/LeadsAPI";
import ProductsAPI from "../../../../api/ProductsAPI";
import LeadRow from "../../leads/Lead/LeadRow.vue";

export default {
  props: ["BankId", "ProductId"],
  components: {
    LeadRow,
  },

  data() {
    return {
      product: {
        type: null,
      },
      leads: [],
      visible: false,
    };
  },

  mounted() {
    this.get_product();
  },

  methods: {
    async get_product() {
      ProductsAPI.get(this.ProductId)
        .then((response) => {
          this.product = response.data.data;
          this.get_filtered();
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    async get_filtered() {
      if (this.product.type !== 1) {
        LeadsAPI.get_filtered(this.product)
          .then((response) => {
            this.leads = response.data;
            console.log(response);
          })
          .catch((e) => {
            console.log(e);
          });
      } else this.get_leads();
    },

    get_leads() {
      LeadsAPI.get_all()
        .then((response) => {
          this.leads = response.data;
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async edit_product() {
      ProductsAPI.edit(this.product)
        .then((response) => {
          this.$root.$emit("createAlertGood");
          this.goTo("/banks/" + this.BankId + "/");
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async delete_product() {
      ProductsAPI.delete(this.product)
        .then((response) => {
          this.$root.$emit("createAlertGood");
          this.goTo("/banks/" + this.BankId + "/");
        })
        .catch((e) => {
          console.log(e);
        });
    },
    showModalDelete() {
      this.visible = true;
    },
    hideModalDelete() {
      this.visible = false;
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
    width: 19%;

    &:first-child {
      width: 5%;
    }
  }
}
</style>
