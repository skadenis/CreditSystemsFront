<template>
  <div>
    <EditBank :BankId="BankId"></EditBank>
    <Products :BankId="BankId"></Products>
  </div>
</template>
<script>
import EditBank from "../../../components/banks/Bank/edit.vue";
import Products from "../../../components/products/index.vue";
export default {
  data() {
    return {
      BankId: Number(this.$route.params.BankId),
    };
  },
  components: {
    EditBank,
    Products,
  },
};
</script>
