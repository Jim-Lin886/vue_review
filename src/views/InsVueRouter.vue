<script>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import Instruction from "../components/Instruction.vue";
export default {
  components: {
    Instruction,
  },
  setup() {
    const route = useRoute();
    const fehId = ref(route.params.fehId);
    return { fehId };
  },
};
</script>
<template>
  <div class="container">
    <instruction class="item" :fehId="fehId" />
    <hr class="divider" />
    <div class="item">333</div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: start;
  .item {
    flex: 1;
  }
}

hr.divider {
  border: 0;
  width: 2px;
  background: #333;
  background-image: linear-gradient(to right, #fff, #ccc, #fff);
}
</style>
