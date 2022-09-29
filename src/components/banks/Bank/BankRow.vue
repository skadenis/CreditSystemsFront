<template>
  <div class="bank-row" @click="open_bank(data.id)">
    <div>
      <p>{{ data.bank_name }}</p>
    </div>
    <div>
      <p v-if="data.income_visibility">
        <i class="pi pi-check" style="color: red"></i>
      </p>
      <p v-else><i class="pi pi-times" style="color: green"></i></p>
    </div>
    <div>
      <p v-if="data.overdraft_visibility">
        <i class="pi pi-check" style="color: red"></i>
      </p>
      <p v-else><i class="pi pi-times" style="color: green"></i></p>
    </div>
    <div>
      <p v-if="data.pawnshop_visibility">
        <i class="pi pi-check" style="color: red"></i>
      </p>
      <p v-else><i class="pi pi-times" style="color: green"></i></p>
    </div>
    <div>
      <p v-if="data.opi_visibility">
        <i class="pi pi-check" style="color: red"></i>
      </p>
      <p v-else><i class="pi pi-times" style="color: green"></i></p>
    </div>
  </div>
</template>

<script>
import "primeicons/primeicons.css";

export default {
  name: "bank",
  props: ["data"],
  methods: {
    open_bank(id) {
      this.goTo("/banks/" + id);
    },
  },
};
</script>

<style scoped lang="scss">
.bank-row {
  display: flex;
  cursor: pointer;
  box-sizing: border-box;

  &:hover {
    background-color: rgb(223, 239, 255);
  }

  &:hover p {
    color: #000;
  }
  div {
    width: calc(100% / 5);
    box-sizing: border-box;
    border-bottom: 1px solid rgb(221, 221, 221);
    border-right: 1px solid rgb(221, 221, 221);
    &:first-child {
      border-left: 1px solid rgb(221, 221, 221);
    }

    p {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px 0;
    }
  }

  div:first-child {
    p {
      justify-items: flex-start;
      padding-left: 10px;
    }
  }
}
</style>
