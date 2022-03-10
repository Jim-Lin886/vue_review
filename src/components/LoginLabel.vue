<script>
import { UserFilled } from "@element-plus/icons-vue";
import { onMounted, onUnmounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { msFormat } from "./FormatUtil.js";
// import Jim from "../assets/images/Jim.jpg";
export default {
  props: {
    objUser: {
      type: Object,
      default: {},
    },
  },
  setup(props) {
    const iconUserFilled = UserFilled;
    const { objUser } = props;
    const { t } = useI18n();

    const logTime = ref(0);
    const logTimeFormat = ref("");
    let timer = null;

    // const imgUrl = ref(require("../assets/images/Jim.jpg"));
    onMounted(() => {
      logTime.value = 0;
      timer = setInterval(() => {
        logTime.value += 1;
        console.log("onMounted");
        console.log(msFormat);
        logTimeFormat.value = msFormat(logTime.value, t);
      }, 1000);
    });

    onUnmounted(() => {
      clearInterval(timer);
    });

    return { iconUserFilled, objUser, logTimeFormat };
  },
};
</script>
<template>
  <div class="container">
    <el-avatar
      :size="large"
      :icon="iconUserFilled"
      :src="objUser.img"
    ></el-avatar>
    <h1>
      {{ `${objUser.userName}  ` }}<br />{{ $t("label.logged") }}:
      {{ logTimeFormat }}
    </h1>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  width: 200px;
  h1 {
    padding-left: 20px;
  }
}
</style>
