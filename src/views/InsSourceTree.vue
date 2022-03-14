<script>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import Instruction from "../components/Instruction.vue";
export default {
  components: {
    Instruction,
  },
  setup() {
    /** route */
    const route = useRoute();
    /** 查詢功能資訊的fehId */
    const fehId = ref(route.params.fehId);
    return { fehId };
  },
};
</script>
<template>
  <div class="container">
    <instruction class="item" :fehId="fehId" />
  </div>
</template>

<style lang="scss" src="../assets/style/instrunctionOneRow.scss" scoped></style>
