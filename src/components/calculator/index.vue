<template>
  <div>
    <a-row type="flex" :gutter="24">
      <a-col :span="24" :lg="6" :md="24">
        <a-form-model-item label="Фамилия">
          <span class="name">{{ lead.lastname }}</span>
        </a-form-model-item>
      </a-col>

      <a-col :span="24" :lg="6" :md="24">
        <a-form-model-item label="Имя">
          <span class="name">{{ lead.name }}</span>
        </a-form-model-item>
      </a-col>

      <a-col :span="24" :lg="12" :md="24">
        <a-form-model-item label="Доход">
          <a-input v-model="salary" type="number" step="50" min="0" />
        </a-form-model-item>
      </a-col>

      <a-col :span="24" :lg="6" :md="24">
        <a-form-model-item class="input-block" label="Дети">
          <a-form-model-item label="В браке">
            <a-input v-model="kids_in" type="number" step="1" min="0" />
          </a-form-model-item>
          <a-form-model-item label="Вне брака">
            <a-input v-model="kids_outside" type="number" step="1" min="0" />
          </a-form-model-item>
        </a-form-model-item>
      </a-col>

      <a-col :span="24" :lg="6" :md="24">
        <a-form-model-item class="input-block" label="Кредиты">
          <a-form-model-item label="Общая сумма">
            <a-input v-model="credits_sum" type="number" step="10" min="0" />
          </a-form-model-item>
          <a-form-model-item label="Срок">
            <a-input v-model="credits_term" type="number" step="1" min="0" />
          </a-form-model-item>
        </a-form-model-item>
      </a-col>

      <a-col :span="24" :lg="6" :md="24">
        <a-form-model-item class="input-block" label="Ломбарды">
          <a-form-model-item label="Общая сумма">
            <a-input v-model="pawnshops_sum" type="number" step="10" min="0" />
          </a-form-model-item>
          <a-form-model-item label="Срок">
            <a-input v-model="pawnshops_term" type="number" step="1" min="0" />
          </a-form-model-item>
        </a-form-model-item>
      </a-col>

      <a-col :span="24" :lg="6" :md="24">
        <a-form-model-item class="input-block" label="Овердрафт">
          <a-form-model-item label="Общая сумма">
            <a-input v-model="overdraft_sum" type="number" step="10" min="0" />
          </a-form-model-item>
          <a-form-model-item label="Срок">
            <a-input v-model="overdraft_term" type="number" step="1" min="0" />
          </a-form-model-item>
        </a-form-model-item>
      </a-col>

      <a-col :span="24" :lg="6" :md="24">
        <a-form-model-item label="ОПИ">
          <a-input v-model="opi" type="number" step="10" min="0" />
        </a-form-model-item>
      </a-col>

      <a-col :span="24" :lg="6" :md="24">
        <a-form-model-item label="Итого расходы">
          <span>{{ costs }}</span>
        </a-form-model-item>
      </a-col>

      <a-col :span="24" :lg="6" :md="24">
        <a-form-model-item label="Платежный уровень">
          <span class="payment-level">{{ result }}</span>
        </a-form-model-item></a-col
      >
    </a-row>
    <a-row type="flex" :gutter="24" class="buttons__block">
      <a-col :span="24" :lg="24" :md="24">
        <a-button class="button" type="primary" @click="save"
          >Сохранить</a-button
        >
      </a-col>
    </a-row>
  </div>
</template>

<script>
import LeadsAPI from "../../../api/LeadsAPI";

export default {
  props: ["LeadId"],

  data() {
    return {
      lead: {
        payment_level: null,
      },
      salary: null,
      kids_in: null,
      kids_outside: null,
      credits_sum: null,
      credits_term: null,
      pawnshops_sum: null,
      pawnshops_term: null,
      overdraft_sum: null,
      overdraft_term: null,
      opi: null,
    };
  },

  mounted() {
    this.get_lead();
  },

  computed: {
    income() {
      return (
        (this.salary - (this.kids_in * 160 + this.kids_outside * 200)) * 0.4
      );
    },
    credits() {
      if (!this.credits_sum || !this.credits_term) {
        return 0;
      }
      if (this.credits_sum && this.credits_term) {
        return this.credits_sum / this.credits_term;
      }
    },
    pawnshops() {
      if (!this.pawnshops_sum || !this.pawnshops_term) {
        return 0;
      }
      if (this.pawnshops_sum && this.pawnshops_term) {
        return this.pawnshops_sum / this.pawnshops_term;
      }
    },
    overdrafts() {
      if (!this.overdraft_sum || !this.overdraft_term) {
        return 0;
      }
      if (this.overdraft_sum && this.overdraft_term) {
        return this.overdraft_sum / this.overdraft_term;
      }
    },
    costs() {
      return (this.credits + this.pawnshops + this.overdrafts).toFixed(2);
    },
    result() {
      return Number((this.income - this.costs - this.opi).toFixed(2));
    },
  },

  methods: {
    get_lead() {
      LeadsAPI.get(this.LeadId)
        .then((response) => {
          this.lead = response.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    save() {
      this.lead.payment_level = this.result;
      this.edit_lead();
    },

    async edit_lead() {
      LeadsAPI.edit(this.lead)
        .then((response) => {
          this.$root.$emit("createAlertGood");
          this.goTo("/leads/" + this.LeadId);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style scoped lang="scss">
.name {
  color: rgba(0, 0, 0, 0.85);
  font-weight: 600;
  font-size: 16px;
}

.payment-level {
  color: rgba(0, 0, 0, 0.85);
  margin-right: 20px;
  font-weight: 600;
}
</style>
