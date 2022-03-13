<script>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import Instruction from "../components/Instruction.vue";
export default {
  components: {
    Instruction,
  },
  setup() {
    console.log("vue");
    const route = useRoute();
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
