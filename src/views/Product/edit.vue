<template>
  <EditProduct :BankId="BankId" :ProductId="ProductId"></EditProduct>
</template>
<script>
import EditProduct from "../../components/products/Product/edit.vue";
export default {
  data() {
    return {
      ProductId: Number(this.$route.params.ProductId),
      BankId: Number(this.$route.params.BankId),
    };
  },
  components: {
    EditProduct,
  },
};
</script>
