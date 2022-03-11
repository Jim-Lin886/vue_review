<script>
import { ref, reactive } from "vue";
import { CircleCheck, CircleClose } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { getUserByAccountId } from "../assets/data/UserInfoController.js";
import { useStore } from "vuex";
export default {
  setup() {
    const iconCheck = CircleCheck;
    const iconClose = CircleClose;
    const router = useRouter();
    const store = useStore();
    const { t } = useI18n();

    const formRef = ref();
    const passwordRef = ref();
    const objLogin = reactive({ account: "", password: "" });
    const hasLoading = ref(false);

    const validateAccount = (rule, value, callback) => {
      // console.log("validateAccount");
      if (value === "") {
        callback(new Error(t("message.inputAccount")));

        $t("label.reset");
      } else {
        // if (objLogin.account !== "") {
        //   if (!formRef.value) return;
        //   formRef.value.validateField("account", () => null);
        // }
      }
      callback();
    };
    const validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(t("message.inputPassword")));
      }
      callback();
    };
    const rules = reactive({
      account: [{ validator: validateAccount, trigger: "blur" }],
      password: [{ validator: validatePassword, trigger: "blur" }],
    });

    const handSummit = (formEl) => {
      if (!formEl) return;
      formEl.validate((valid) => {
        if (valid) {
          fnLogin();
        } else {
          return false;
        }
      });
    };
    const handReset = (el) => {
      el.resetFields();
    };

    const handAccountKeyEnter = () => {
      passwordRef.value.focus();
    };

    const fnLogin = async () => {
      try {
        hasLoading.value = true;
        const user = await getUserByAccountId(
          objLogin.account,
          objLogin.password
        );
        if (user && user.length > 0) {
          router.push({ path: "/main" });
          store.dispatch("commitObjUser", user[0]);
        } else {
          store.dispatch("commitObjUser", user);
        }
        hasLoading.value = false;
      } catch (error) {
        // console.log("getUserByAccountId", error);
      }
    };

    return {
      formRef,
      passwordRef,
      objLogin,
      rules,
      hasLoading,
      handSummit,
      handReset,
      handAccountKeyEnter,
      iconCheck,
      iconClose,
    };
  },
};
</script>

<template>
  <div id="bg">
    <div class="login" :style="{ boxShadow: `var(--el-box-shadow-base)` }">
      <img alt="Vue logo" src="../assets/logo.png" />
      <el-form
        ref="formRef"
        :model="objLogin"
        :rules="rules"
        status-icon
        label-width="40px"
        class="demo-ruleForm"
      >
        <el-form-item label="Account" prop="account">
          <template #label>
            <svg
              class="icon"
              width="30"
              height="30"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              data-v-042ca774=""
            >
              <path
                fill="currentColor"
                d="M512 512a192 192 0 100-384 192 192 0 000 384zm0 64a256 256 0 110-512 256 256 0 010 512zm320 320v-96a96 96 0 00-96-96H288a96 96 0 00-96 96v96a32 32 0 11-64 0v-96a160 160 0 01160-160h448a160 160 0 01160 160v96a32 32 0 11-64 0z"
              ></path>
            </svg>
          </template>
          <el-input
            v-model="objLogin.account"
            type="text"
            clearable
            autocomplete="false"
            :placeholder="$t('label.account')"
            @keydown.enter="handAccountKeyEnter"
          >
          </el-input>
        </el-form-item>

        <el-form-item label="Password" prop="password">
          <template #label>
            <svg
              class="icon"
              width="30"
              height="30"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              data-v-042ca774=""
            >
              <path
                fill="currentColor"
                d="M224 448a32 32 0 00-32 32v384a32 32 0 0032 32h576a32 32 0 0032-32V480a32 32 0 00-32-32H224zm0-64h576a96 96 0 0196 96v384a96 96 0 01-96 96H224a96 96 0 01-96-96V480a96 96 0 0196-96z"
              ></path>
              <path
                fill="currentColor"
                d="M512 544a32 32 0 0132 32v192a32 32 0 11-64 0V576a32 32 0 0132-32zM704 384v-64a192 192 0 10-384 0v64h384zM512 64a256 256 0 01256 256v128H256V320A256 256 0 01512 64z"
              ></path>
            </svg>
          </template>
          <el-input
            ref="passwordRef"
            v-model="objLogin.password"
            type="password"
            clearable
            show-password
            autocomplete="false"
            :placeholder="$t('label.password')"
            @keydown.enter="handSummit(formRef)"
          ></el-input>
        </el-form-item>

        <el-form-item class="center">
          <!-- <el-tooltip :content="$t('label.login')"> -->
          <!-- <template #content>{{ $t("label.login") }}</template> -->
          <el-button
            v-loading.fullscreen.lock="hasLoading"
            type="primary"
            style="width: 70px; height: 70px"
            circle
            @click="handSummit(formRef)"
            >{{ $t("label.login") }}</el-button
          >

          <!-- :icon="iconCheck" -->
          <!-- </el-tooltip> -->
          <!-- <el-tooltip :content="$t('label.reset')" placement="bottom"> -->
          <!-- <template #content>{{ $t("label.reset") }}</template> -->
          <el-button
            style="width: 70px; height: 70px"
            circle
            @click="handReset(formRef)"
            >{{ $t("label.reset") }}</el-button
          >
          <!-- :icon="iconClose" -->
          <!-- </el-tooltip> -->
        </el-form-item>
      </el-form>
      <p>&#64;測試帳密:Jim/Jim</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#bg {
  height: 100vh;
  width: 100vw;
  background: no-repeat url("../assets/images/defaultbg.png");
  overflow: hidden;
  position: fixed;
  left: 0px;
  top: 0px;
}

.login {
  // height: 50vh;
  width: 30vw;
  // min-height: 480px;
  min-width: 460px;
  padding: 10px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.center {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  left: -20px;
}
</style>
