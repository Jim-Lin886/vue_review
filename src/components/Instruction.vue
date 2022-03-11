<script>
import { reactive } from "vue";
import { getInsVueContentById } from "../assets/data/InstructionController.js";
export default {
  components: {},
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
      // console.log(fehData);
    });

    const handLinkClick = (e) => {
      // console.log("handLinkClick", e);
      window.open(fehData.data.refUrl, "");
      return false;
    };

    console.log();
    return { fehData, handLinkClick };
  },
};
</script>
<template>
  <div class="container">
    <h1 class="title">{{ fehData.data.title }}</h1>

    <a
      v-if="fehData.data.refUrl || false"
      :href="fehData.data.refUrl"
      @click.prevent="handLinkClick"
      >{{ fehData.data.refContent }}</a
    >
    <p>{{ fehData.data.content }}</p>
    <!-- <img :src="fehData.data.img" alt="" /> -->
    <el-image v-if="fehData.data.img || false" :src="fehData.data.img">
    </el-image>

    <p
      class="imgContent"
      v-if="fehData.data.imgContent || false"
      :src="fehData.data.imgContent"
    >
      {{ fehData.data.imgContent }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-end;
  justify-content: flex-start;
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

.imgContent {
  color: #a4b0be;
  font-size: 12;
}
</style>
