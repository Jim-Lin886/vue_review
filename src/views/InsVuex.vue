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
          修改Vuex中使用者資料狀態，存檔後右上使用者資料同步更新:
        </li>
      </ul>
      <ol>
        <li>建立Vuex實體</li>
        <li>dispatch 修改後使用者資料的 Action</li>
        <li>commit 修改後使用者資料的 mutation</li>
      </ol>
      <user-info :readMode="false" />
    </div>
  </div>
</template>

<style lang="scss" src="../assets/style/instrunctionTwoRow.scss" scoped></style>
