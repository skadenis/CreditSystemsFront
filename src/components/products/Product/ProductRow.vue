<template>
  <div class="product-row" @click="open_product(product.id)">
    <div>
      <p>{{ product.product_name }}</p>
    </div>
    <div>
      <p>{{ product.type | productTypeName }}</p>
    </div>
    <div>
      <p>
        <span
          >От {{ product.min_amount }} до {{ product.max_amount }}
          {{ product.currency | currensyName }}</span
        >
      </p>
    </div>
    <div>
      <p>
        <span>От {{ product.min_term }} до {{ product.max_term }} мес.</span>
      </p>
    </div>
    <div>
      <p v-if="product.max_percent === null">
        <span>От {{ product.min_percent }} %</span>
      </p>
      <p v-if="product.max_percent !== null">
        <span>От {{ product.min_percent }} до {{ product.max_percent }} %</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["product"],

  data() {
    return {
      bank: {},
    };
  },

  methods: {
    open_product(id) {
      this.goTo("/banks/" + this.product.bank_id + "/product/" + id);
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
