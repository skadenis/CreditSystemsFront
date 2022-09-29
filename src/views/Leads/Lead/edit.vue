<template>
  <EditLead :LeadId="LeadId"></EditLead>
</template>
<script>
import EditLead from "../../../components/leads/Lead/edit.vue";
export default {
  data() {
    return {
      LeadId: Number(this.$route.params.LeadId),
    };
  },
  components: {
    EditLead,
  },
};
</script>
