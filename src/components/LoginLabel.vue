<script>
import { UserFilled } from "@element-plus/icons-vue";
import { onMounted, onUnmounted, ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { msFormat } from "./FormatUtil.js";

import UserInfo from "../views/form/UserInfo.vue";

export default {
  components: {
    UserInfo,
  },
  props: {
    hasTimer: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    /** 使用者icon */
    const iconUserFilled = UserFilled;
    /** vuex */
    const store = useStore();
    /** i18n方法 */
    const { t } = useI18n();
    /** 顯示登入時間 */
    const { hasTimer } = props;
    /** 顯示編輯表單 */
    const isShowEditor = ref(false);

    /** 登入者資訊 */
    const objUser = computed(() => store.getters.getObjUser);

    /** 登入累計時間 */
    const logTime = ref(0);
    /** 格式化登入累計時間 */
    const logTimeFormat = ref("");
    /** 登入累計時間計數器 */
    let timer = null;

    /** 按下使用者名稱:開啟編輯表單 */
    const handUserNameClick = () => {
      isShowEditor.value = true;
    };

    /** 監聽userinfoClickCancel事件:關閉編輯表單 */
    const handClickCancel = (val) => {
      isShowEditor.value = false;
    };

    onMounted(() => {
      logTime.value = 0;
      if (hasTimer) {
        timer = setInterval(() => {
          logTime.value += 1;
          logTimeFormat.value = msFormat(logTime.value, t);
        }, 1000);
      }
    });

    onUnmounted(() => {
      if (null !== timer) {
        clearInterval(timer);
      }
    });

    // const imgUrl = ref(require("../assets/images/Jim.jpg"));
    return {
      iconUserFilled,
      objUser,
      isShowEditor,
      logTimeFormat,
      handUserNameClick,
      handClickCancel,
    };
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
    <div>
      <h2 class="text" @click="handUserNameClick">
        {{ `${objUser.userName}` }}
      </h2>
      <h3 class="text" v-if="hasTimer">
        {{ $t("label.logged") }}: {{ logTimeFormat }}
      </h3>
    </div>
  </div>
  <el-dialog
    id="diag"
    v-if="isShowEditor"
    v-model="isShowEditor"
    :title="$t('label.userInfo')"
  >
    <user-info :readMode="false" @userinfoClickCancel="handClickCancel" />

    <!-- <template #footer>
      <span>
        <el-button @click="handCancelClick">{{ $t("label.cancel") }}</el-button>
        <el-button @click="handConfirmClick">{{
          $t("label.confirm")
        }}</el-button>
      </span>
    </template> -->
  </el-dialog>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  width: 200px;
  div {
    margin: 0px;
  }
  h2 {
    text-decoration: underline;
    padding-bottom: 10px;
  }
  .text {
    padding: 0px 10px 0px 10px;
    margin: 0;
  }
}

#diag {
  position: absolute;
}
</style>
