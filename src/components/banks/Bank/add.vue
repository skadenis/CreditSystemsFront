<template>
  <div>
    <a-form-model-item label="Название">
      <a-input
        v-model="bank.bank_name"
        :style="!bank.bank_name ? 'border-color: red' : 'border-color: #D9D9D9'"
      />
    </a-form-model-item>
    <a-form-model-item label="Комментарий">
      <a-textarea rows="4" v-model="bank.description" />
    </a-form-model-item>

    <a-row type="flex" :gutter="24">
      <a-col :span="24" :lg="6" :md="24">
        <a-form-model-item label="Видимость дохода">
          <a-switch v-model="bank.income_visibility" />
        </a-form-model-item>
      </a-col>
      <a-col :span="24" :lg="6" :md="24">
        <a-form-model-item label="Видимость овердрафта">
          <a-switch v-model="bank.overdraft_visibility" />
        </a-form-model-item>
      </a-col>
      <a-col :span="24" :lg="6" :md="24">
        <a-form-model-item label="Видимость ломбарда">
          <a-switch v-model="bank.pawnshop_visibility" />
        </a-form-model-item>
      </a-col>
      <a-col :span="24" :lg="6" :md="24">
        <a-form-model-item label="Видимость ОПИ">
          <a-switch v-model="bank.opi_visibility" />
        </a-form-model-item>
      </a-col>
    </a-row>

    <a-row type="flex" :gutter="24" class="buttons__block">
      <a-col :span="24" :lg="24" :md="24">
        <a-button
          class="button"
          type="primary"
          @click="bank.bank_name ? add_bank() : make_error()"
          >Добавить</a-button
        >
      </a-col>
    </a-row>
  </div>
</template>

<script>
import BanksAPI from "../../../../api/BanksAPI";

export default {
  data() {
    return {
      bank: {},
    };
  },
  methods: {
    async add_bank() {
      BanksAPI.add(this.bank)
        .then((response) => {
          this.$root.$emit("createAlertGood");
          this.goTo("/banks/" + response.data.data.id);
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
