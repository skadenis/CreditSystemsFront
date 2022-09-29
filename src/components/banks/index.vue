<template>
  <div>
    <button class="add-btn" @click="add_bank">Добавить Банк</button>
    <div class="table">
      <p>Название</p>
      <p>Видимость дохода</p>
      <p>Видимость овердрафта</p>
      <p>Видимость ломбарда</p>
      <p>Видимость ОПИ</p>
    </div>
    <BankRow v-for="(bank, index) in banks" :key="index" :data="bank"></BankRow>
  </div>
</template>

<script>
import BanksAPI from "../../../api/BanksAPI";
import BankRow from "./Bank/BankRow.vue";

export default {
  components: {
    BankRow,
  },
  data() {
    return {
      banks: [],
    };
  },

  mounted() {
    this.get_banks();
  },

  methods: {
    get_banks() {
      BanksAPI.get_all()
        .then((response) => {
          this.banks = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    add_bank() {
      this.goTo("/banks/add");
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
