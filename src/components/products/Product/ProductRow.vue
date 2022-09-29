<template>
  <div class="product-row" @click="open_product(data.id)">
    <div>
      <p>{{ data.product_name }}</p>
    </div>
    <div>
      <p>{{ data.type | productTypeName }}</p>
    </div>
    <div>
      <p>
        <span
          >От {{ data.min_amount }} до {{ data.max_amount }}
          {{ data.currency | currensyName }}</span
        >
      </p>
    </div>
    <div>
      <p>
        <span>От {{ data.min_term }} до {{ data.max_term }} мес.</span>
      </p>
    </div>
    <div>
      <p v-if="data.max_percent === null">
        <span>От {{ data.min_percent }} %</span>
      </p>
      <p v-if="data.max_percent !== null">
        <span>От {{ data.min_percent }} до {{ data.max_percent }} %</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "product",

  props: ["data"],

  methods: {
    open_product(id) {
      this.goTo("/banks/" + this.data.bank_id + "/product/" + id);
    },
  },
};
</script>

<style scoped lang="scss">
.product-row {
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
      padding: 10px;
      line-height: 14px;
    }
  }
}
</style>
