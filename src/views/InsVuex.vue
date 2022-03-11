<script>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import Instruction from "../components/Instruction.vue";

import UserInfo from "../views/form/UserInfo.vue";

export default {
  components: {
    Instruction,
    UserInfo,
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
    <hr class="divider" />
    <div class="item keepLeft">
      <h1>&#64;{{ $t("label.example") }}</h1>
      <ul>
        <li style="font-weight: bold">
          修改Vuex中使用者資料狀態，存檔後右上患者資訊同步更新:
        </li>
      </ul>
      <ol>
        <li>建立Vuex實體</li>
        <li>dispatch修改使用者資料Action</li>
        <li>commit修改使用者資料mutation事件</li>
      </ol>
      <user-info :readMode="false" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: flex-start;
  padding: 10px;
  .item {
    flex: 1;
    justify-content: flex-start;
    padding: 10px;
  }
}

hr.divider {
  border: 0;
  width: 2px;
  background: #333;
  background-image: linear-gradient(to right, #fff, #ccc, #fff);
}

li {
  text-align: left;
}

h1 {
  width: 100%;
  color: #3d3d3d;
  margin: 0;
  font-weight: bold;
  font-size: 24;
  text-align: left;
}
</style>
