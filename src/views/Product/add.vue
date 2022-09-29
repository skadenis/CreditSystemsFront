<template>
  <AddProduct :BankId="BankId"></AddProduct>
</template>
<script>
import AddProduct from "../../components/products/Product/add.vue";
export default {
  data() {
    return {
      BankId: Number(this.$route.params.BankId),
    };
  },
  components: {
    AddProduct,
  },
};
</script>
