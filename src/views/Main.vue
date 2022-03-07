<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Setting, Menu, HomeFilled, TurnOff } from "@element-plus/icons-vue";
import {
  Route_VUE,
  Route_VUEX,
  Route_VUE_ROUTER,
  Route_GITHUB,
  Route_SOURCE_TREE,
} from "@/router";
import { getFehIdByType } from "@/assets/data/InstructionController.js";
import LanguageChooser from "../components/LanguageChooser.vue";

export default {
  components: {
    IconHome: HomeFilled,
    LanguageChooser,
  },
  setup() {
    const iconMenu = Menu;
    const IconSetting = Setting;
    const iconTurnOff = TurnOff;

    const store = useStore();
    const router = useRouter();

    const isOpenMenu = computed({
      get: () => {
        return store.getters.getIsOpenMenu;
      },
      set: (val) => {
        store.dispatch("commitIsOpenMenu");
      },
    });
    const handMenuOpen = (key, keyPath) => {
      // console.log(key, keyPath);
      // console.log("handMenuOpen");
    };
    const handMenuClose = (key, keyPath) => {
      // console.log(key, keyPath);
      // console.log("handMenuClose");
    };
    const handMenuSelect = (index, indexPath) => {
      let ary = [
        "",
        { path: Route_VUE },
        { path: Route_VUEX },
        { path: Route_VUE_ROUTER },
        { path: Route_GITHUB },
        { path: Route_SOURCE_TREE },
      ];
      let routerType = ary[index]["path"];
      let fehId = getFehIdByType(routerType) || "";

      router.push(
        fehId
          ? {
              path: `/main/${routerType}/${fehId}`,
            }
          : { path: `/main` }
      );
      // console.log("handMenuSelect");
    };
    const handBtnOpenMenu = () => {
      isOpenMenu.value = !isOpenMenu;
      // console.log("handBtnOpenMenu", store);
    };
    const handLogout = () => {
      router.push({ path: "/" });
    };
    const handGithub = () => {
      window.open("https://github.com/Jim-Lin886/vue_review");
    };

    return {
      iconMenu,
      IconSetting,
      iconTurnOff,
      isOpenMenu,
      handMenuOpen,
      handMenuClose,
      handMenuSelect,
      handBtnOpenMenu,
      handLogout,
      handGithub,
    };
  },
};
</script>

<template>
  <el-container
    class="layout-container-demo"
    style="height: 100vh; border: 1px solid #eee"
  >
    <el-container>
      <el-header style="height: 70px; text-align: left; font-size: 12px">
        <div class="toolbar">
          <el-row
            style="height: 70px"
            gutter="10"
            justify="space-between"
            align="middle"
          >
            <el-col :span="4">
              <el-tooltip content="清單" placement="bottom">
                <el-button
                  type="primary"
                  style="width: 50px; height: 50px"
                  :icon="iconMenu"
                  circle
                  @click="handBtnOpenMenu"
                ></el-button>
              </el-tooltip>
            </el-col>
            <el-col :span="20">
              <div class="toolbar-left">
                <el-popover placement="bottom" :width="400" trigger="click">
                  <template #reference>
                    <el-button
                      type="primary"
                      style="width: 50px; height: 50px"
                      :icon="IconSetting"
                      circle
                    ></el-button>
                  </template>

                  <div style="height: 200px; width: 100%">
                    <h3>{{ $t("label.selectLang") }}</h3>
                    <language-chooser />
                  </div>
                </el-popover>

                <el-tooltip content="登出" placement="bottom">
                  <el-button
                    type="primary"
                    style="width: 50px; height: 50px"
                    :icon="iconTurnOff"
                    circle
                    @click="handLogout"
                  ></el-button>
                </el-tooltip>
                <el-tooltip content="Github" placement="bottom">
                  <el-button
                    color="#f0f0f0"
                    style="width: 50px; height: 50px"
                    circle
                    @click="handGithub"
                  >
                    <el-icon>
                      <img
                        style="width: 30px; height: 30px"
                        alt=""
                        src="../assets/images/gitHub.png"
                      />
                    </el-icon>
                  </el-button>
                </el-tooltip>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-header>

      <el-main>
        <div id="main">
          <el-menu
            default-active="2"
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            text-color="#fff"
            :collapse="isOpenMenu"
            @open="handMenuOpen"
            @close="handMenuClose"
            @select="handMenuSelect"
          >
            <el-menu-item index="0">
              <el-icon :size="80"><icon-home /></el-icon>
              <span>首頁</span>
            </el-menu-item>
            <el-menu-item index="1">
              <!-- <el-icon><icon-apple /></el-icon> -->
              <el-icon>
                <img
                  style="width: 30px; height: 30px"
                  alt=""
                  src="../assets/logo.png"
                />
              </el-icon>
              <template #title>Vue3.js</template>
            </el-menu-item>
            <el-menu-item index="2">
              <!-- <el-icon><icon-document /></el-icon> -->
              <el-icon>
                <img
                  style="width: 30px; height: 30px"
                  alt=""
                  src="../assets/images/vuex.png"
                />
              </el-icon>
              <template #title>Vuex4</template>
            </el-menu-item>
            <el-menu-item index="3">
              <!-- <el-icon><icon-setting /></el-icon> -->
              <el-icon>
                <img
                  style="width: 30px; height: 30px"
                  alt=""
                  src="../assets/images/vueRouter.png"
                />
              </el-icon>
              <template #title>Vue Router4</template>
            </el-menu-item>
            <el-sub-menu index="">
              <template #title>
                <!-- <el-icon><icon-location /></el-icon> -->
                <el-icon>
                  <img
                    style="width: 30px; height: 30px"
                    alt=""
                    src="../assets/images/git.png"
                  />
                </el-icon>
                <span>Git</span>
              </template>
              <el-menu-item index="4">
                <el-icon>
                  <img
                    style="width: 30px; height: 30px"
                    alt=""
                    src="../assets/images/gitHub.png"
                  />
                </el-icon>
                <template #title>GitHub</template>
              </el-menu-item>
              <el-menu-item index="5">
                <el-icon>
                  <img
                    style="width: 30px; height: 30px"
                    alt=""
                    src="../assets/images/sourceTree.png"
                  />
                </el-icon>
                <template #title>SourceTree</template>
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
          <router-view />
          <!-- <div ref="mainRight" id="main-right">menu right</div> -->
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.test-bg {
  background: #e65775;
}

#main {
  height: 100%;
  display: flex;
  flex-flow: row nowrap;

  #main-right {
    width: 100%;
    // flex-basis: 100%;
  }
}

.layout-container-demo {
  height: 100vh;
  width: 100vw;
  position: fixed;
  left: 0px;
  top: 0px;

  .el-header {
    position: relative;
    background-color: #b3c0d1;
    color: var(--el-text-color-primary);
    padding: 0px;

    .toolbar {
      width: 100%;
      height: 100%;
      padding: 10;

      .toolbar-left {
        display: flex;
        justify-content: flex-end;
      }
    }
  }

  .el-menu {
    border-right: none;
  }
  .el-main {
    padding: 0;
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
