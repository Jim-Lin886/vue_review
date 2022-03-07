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

    // watch(
    //   () => props.fehId,
    //   (val, oldVal) => {
    //     console.log("watch-props.fehId", val);
    //   }
    // );
    return { fehData };
  },
};
</script>
<template>
  <div class="container">
    <h1 class="title">{{ fehData.data.title }}</h1>
    <div class="container2">
      <p>{{ fehData.data.content }}</p>
      <!-- <img :src="fehData.data.img" alt="" /> -->
      <el-image :src="fehData.data.img">
        <template #error>
          <div>
            <el-icon><icon-picture /></el-icon>
          </div>
        </template>
      </el-image>
    </div>
    <!-- <a href="http://https://v3.cn.vuejs.org/">參考官方</a> -->
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  margin: 20px;
  // justify-items: center;
  text-align: left;
}

h1 {
  flex: auto;
  margin: 0px;
  font-size: 36px;
  font-weight: bold;
}

.container2 {
  display: flex;
  // flex-direction: column;
  P {
    flex: auto;
    padding: 10px;
  }
  img {
    flex-basis: 300px;
  }
}
a {
  font-style: italic;
}

.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
