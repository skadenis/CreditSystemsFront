<template>
  <div>
    <button class="add-btn" @click="add_lead">Добавить лида</button>
    <a-row type="flex" :gutter="24">
      <a-col :span="24" :lg="5" :md="5">
        <a-form-model-item label="Статус">
          <a-select style="width: 100%" v-model="filters.status">
            <a-select-option :value="0"> Все </a-select-option>
            <a-select-option :value="1"> Новые </a-select-option>
            <a-select-option :value="2"> Просмотренные </a-select-option>
            <a-select-option :value="3"> Обработанные </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-col>
      <a-col :span="24" :lg="5" :md="5">
        <a-form-model-item label="Цель кредита">
          <a-select
            default-value="0"
            style="width: 100%"
            v-model="filters.credit_target"
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
    </a-row>
    <div class="table">
      <p>№</p>
      <p>Статус</p>
      <p>Номер телефона</p>
      <p>Фамилия</p>
      <p>Имя</p>
      <p>П/У</p>
    </div>
    <LeadRow
      v-for="(lead, index) in filteredLeads"
      :index="index"
      :key="index"
      :data="lead"
    />
  </div>
</template>

<script>
import LeadRow from "./Lead/LeadRow.vue";
import LeadsAPI from "../../../api/LeadsAPI";

export default {
  components: {
    LeadRow,
  },
  data() {
    return {
      leads: [],
      filteredLeads: [],
      filters: {
        debt: 0,
        status: 0,
        credit_target: 0,
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
    this.get_leads();
  },

  methods: {
    filterData: async function () {
      let leads = this.leads;

      if (this.filters.debt !== 0) {
        leads = leads.filter((lead) => lead.debt === this.filters.debt);
      }

      if (this.filters.status !== 0) {
        leads = leads.filter((lead) => lead.status === this.filters.status);
      }

      if (this.filters.credit_target !== 0) {
        leads = leads.filter(
          (lead) => lead.credit_target === this.filters.credit_target
        );
      }

      this.filteredLeads = leads;
    },

    get_leads() {
      LeadsAPI.get_all()
        .then((response) => {
          this.leads = response.data;
          this.filterData();
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    add_lead() {
      this.goTo("/leads/add");
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
