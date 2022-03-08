<script>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import Instruction from "../components/Instruction.vue";

import { apiGetWeatherOfKH, apiGetCityList, apiGetTownList } from "../axios";
export default {
  components: {
    Instruction,
  },
  setup() {
    console.log("vue");
    const route = useRoute();
    const fehId = ref(route.params.fehId);

    const handClick = (e) => {
      apiGetWeatherOfKH()
        .then((res) => {
          console.log("apiGetWeatherOfKH", data.res);
        })
        .catch((error) => {});
    };
    const handClick1 = (e) => {
      apiGetCityList()
        .then((res) => {
          console.log("apiGetTownList", data.res);
        })
        .catch((error) => {});
    };
    const handClick2 = (e) => {
      apiGetTownList("63000")
        .then((res) => {
          console.log("apiGetTownList", data.res);
        })
        .catch((error) => {});
    };
    return { fehId, handClick, handClick1, handClick2 };
  },
};
</script>
<template>
  <div class="container">
    <instruction class="item" :fehId="fehId" />
    <div class="item">
      <el-button @click="handClick">weather</el-button>
      <el-button @click="handClick1">city</el-button>
      <el-button @click="handClick2">town</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  .item {
    flex: 1;
  }
}
</style>
