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
    <div class="item keepLeft">
      <h1>&#64;{{ $t("label.example") }}</h1>
      <ul>
        <li style="font-weight: bold">該網站使用前端路由的單頁式應用(SPA):</li>
      </ul>

      <ol>
        <li>第一層路由:登入頁面、登入後的功能頁面。</li>
        <li>
          第二層嵌套路由:左側功能清單使用動態參數路由，每個功能皆會傳參數(fehId)至渲染頁面供元件查詢資料使用。
        </li>
      </ol>
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
