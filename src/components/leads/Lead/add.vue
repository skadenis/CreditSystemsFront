<template>
  <div>
    <a-form-model-item>
      <a-row type="flex" :gutter="24">
        <a-col :span="24" :lg="24" :md="24">
          <a-form-model-item label="Статус"> Новый </a-form-model-item>
        </a-col>
        <a-col :span="24" :lg="8" :md="24">
          <a-form-model-item label="Номер телефона">
            <a-input
              :style="
                lead.phone.length !== 17
                  ? 'border-color: red'
                  : 'border-color: #D9D9D9'
              "
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
              :style="
                !lead.desired_amount
                  ? 'border-color: red'
                  : 'border-color: #D9D9D9'
              "
              type="number"
              step="1000"
              min="1000"
              v-model="lead.desired_amount"
            /> </a-form-model-item
        ></a-col>
        <a-col :span="24" :lg="8" :md="24">
          <a-form-model-item label="Срок">
            <a-input
              :style="
                !lead.term ? 'border-color: red' : 'border-color: #D9D9D9'
              "
              type="number"
              step="1"
              min="1"
              v-model="lead.term"
            /> </a-form-model-item
        ></a-col>
        <a-col :span="24" :lg="8" :md="24">
          <a-form-model-item label="Цель кредита">
            <a-select style="width: 100%" v-model="lead.credit_target">
              <a-select-option :value="1"> Не выбрано </a-select-option>
              <a-select-option :value="2">
                Потребительский кредит
              </a-select-option>
              <a-select-option :value="3">
                Рефинансирование текущего кредита
              </a-select-option>
              <a-select-option :value="4"> На автомобиль </a-select-option>
              <a-select-option :value="5">
                На покупку квартиры
              </a-select-option>
              <a-select-option :value="6">
                На строительство жилья
              </a-select-option>
            </a-select>
          </a-form-model-item></a-col
        >
      </a-row>
    </a-form-model-item>
    <a-form-model-item>
      <a-row type="flex" :gutter="24" class="buttons__block">
        <a-col :span="24" :lg="24" :md="24">
          <a-button
            class="button"
            type="primary"
            @click="
              lead.phone.length === 17 && lead.desired_amount && lead.term
                ? add_lead()
                : make_error()
            "
            >Добавить</a-button
          >
        </a-col>
      </a-row>
    </a-form-model-item>
  </div>
</template>

<script>
import LeadsAPI from "../../../../api/LeadsAPI";
import { maska } from "maska";

export default {
  directives: { maska },
  data() {
    return {
      lead: {
        phone: "",
      },
    };
  },
  methods: {
    async add_lead() {
      LeadsAPI.add(this.lead)
        .then((response) => {
          this.$root.$emit("createAlertGood");
          this.goTo("/leads/" + response.data.data.id);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    make_error() {
      this.$root.$emit("createAlertError");
    },
  },
};
</script>

<style scoped lang="scss"></style>
