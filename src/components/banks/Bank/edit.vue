<template>
  <div>
    <a-form-model-item label="Название">
      <a-input v-model="bank.bank_name" />
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
      <a-col :span="24" :lg="12" :md="24">
        <a-button class="button" type="primary" @click="edit_bank"
          >Сохранить</a-button
        >
      </a-col>
      <a-col :span="24" :lg="12" :md="24">
        <a-button class="button" type="danger" @click="showModalDelete"
          >Удалить</a-button
        >
      </a-col>
    </a-row>

    <a-modal :visible="visible" @ok="delete_bank" @cancel="hideModalDelete">
      Удалить?
    </a-modal>
    <a-form-model-item label="Продукты банка" />
  </div>
</template>

<script>
import BanksAPI from "../../../../api/BanksAPI";
export default {
  props: ["BankId"],
  data() {
    return {
      bank: {},
      visible: false,
    };
  },
  mounted() {
    this.get_bank();
  },
  methods: {
    get_bank() {
      BanksAPI.get(this.BankId)
        .then((response) => {
          this.bank = response.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    async edit_bank() {
      BanksAPI.edit(this.bank)
        .then((response) => {
          this.$root.$emit("createAlertGood");
          this.goTo("/banks/");
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async delete_bank() {
      BanksAPI.delete(this.bank)
        .then((response) => {
          this.$root.$emit("createAlertGood");
          this.goTo("/banks/");
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

<style scoped lang="scss"></style>
