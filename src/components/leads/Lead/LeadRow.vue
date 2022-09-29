<template>
  <div class="lead-row" @click="open_lead(data.id)">
    <div>
      <p>{{ index + 1 }}</p>
    </div>
    <div>
      <p>{{ data.status | leadStatusName }}</p>
    </div>
    <div>
      <p>{{ data.phone }}</p>
    </div>
    <div>
      <p>{{ data.lastname }}</p>
    </div>
    <div>
      <p>{{ data.name }}</p>
    </div>
    <div>
      <p>
        <span v-if="data.payment_level !== 0">{{ data.payment_level }}</span>
        <span
          v-if="!data.payment_level"
          @click="open_calculator(data.id)"
          class="calculator-link"
          >Рассчитать</span
        >
      </p>
    </div>
  </div>
</template>

<script>
import LeadsAPI from "../../../../api/LeadsAPI";

export default {
  name: "lead",
  props: ["data", "index"],
  methods: {
    open_lead(id) {
      if (this.data.status === 1) {
        this.data.status = 2;
        this.edit_lead();
      }
      this.goTo("/leads/" + id);
    },
    async edit_lead() {
      LeadsAPI.edit(this.data)
        .then((response) => {})
        .catch((e) => {
          console.log(e);
        });
    },
    open_calculator(id) {
      this.goTo("/calculator/" + id);
    },
  },
};
</script>

<style scoped lang="scss">
.lead-row {
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
    width: 19%;
    box-sizing: border-box;
    border-bottom: 1px solid rgb(221, 221, 221);
    border-right: 1px solid rgb(221, 221, 221);

    &:first-child {
      width: 5%;
      border-left: 1px solid rgb(221, 221, 221);
    }

    p {
      padding: 10px;
      line-height: 14px;

      .calculator-link {
        color: rgb(37, 147, 252);
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
