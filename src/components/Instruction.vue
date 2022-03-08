<script>
import { reactive, watch } from "vue";
import { picture } from "@element-plus/icons-vue";
import { getInsVueContentById } from "../assets/data/InstructionController.js";
export default {
  components: {
    iconPicture: picture,
  },
  props: {
    fehId: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const fehData = reactive({ data: {} });

    getInsVueContentById(props.fehId).then((res) => {
      fehData.data = res.data;
      console.log(fehData);
    });

    console.log();
    return { fehData };
  },
};
</script>
<template>
  <div class="container">
    <h1 class="title">{{ fehData.data.title }}</h1>
    <p>{{ fehData.data.content }}</p>
    <!-- <img :src="fehData.data.img" alt="" /> -->
    <el-image :src="fehData.data.img"> </el-image>
    <a v-if="fehData.data.refUrl || false" :href="fehData.data.refUrl">{{
      fehData.data.refContent
    }}</a>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-end;
  justify-content: start;
  width: 100%;
  margin: 0px;
  padding: 20px;
  text-align: left;
  box-sizing: border-box;
}

h1 {
  width: 100%;
  color: #3d3d3d;
  margin: 0px;
  font-size: 36px;
  font-weight: bold;
}

a {
  text-decoration: none;
  font-style: italic;
}
</style>
