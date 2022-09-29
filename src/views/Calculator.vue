<template>
  <Calculator :LeadId="LeadId" />
</template>
<script>
import Calculator from "../components/calculator/index.vue";
export default {
  data() {
    return {
      LeadId: Number(this.$route.params.LeadId),
    };
  },

  components: {
    Calculator,
  },
};
</script>
