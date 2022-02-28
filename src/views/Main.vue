<script>
import { computed } from "vue";
import { useStore } from "vuex";
import {
  Location,
  Document,
  Apple,
  Setting,
  Menu,
} from "@element-plus/icons-vue";
export default {
  components: {
    IconLocation: Location,
    IconDocument: Document,
    IconApple: Apple,
    IconSetting: Setting,
  },
  setup() {
    const iconMenu = Menu;
    const store = useStore();
    const isOpenMenu = computed({
      get: () => {
        return store.getters.getIsOpenMenu;
      },
      set: (val) => {
        store.dispatch("commitIsOpenMenu");
      },
    });

    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handOpenMenu = () => {
      isOpenMenu.value = !isOpenMenu;
      // store.dispatch("commitIsOpenMenu");
      // console.log("handOpenMenu", store);
    };

    return {
      iconMenu,
      isOpenMenu,
      handleOpen,
      handleClose,
      handOpenMenu,
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
      <el-header style="text-align: left; font-size: 12px">
        <div class="toolbar">
          <el-button
            type="primary"
            style="width: 50px; height: 50px"
            :icon="iconMenu"
            circle
            @click="handOpenMenu"
          ></el-button>
        </div>
      </el-header>

      <el-main>
        <div id="main">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            :collapse="isOpenMenu"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-menu-item index="1">
              <el-icon><icon-location /></el-icon>
              <span>Navigator One</span>
            </el-menu-item>
            <el-menu-item index="2">
              <el-icon><icon-apple /></el-icon>
              <template #title>Navigator Two</template>
            </el-menu-item>
            <el-menu-item index="3">
              <el-icon><icon-document /></el-icon>
              <template #title>Navigator Three</template>
            </el-menu-item>
            <el-menu-item index="4">
              <el-icon><icon-setting /></el-icon>
              <template #title>Navigator Four</template>
            </el-menu-item>
          </el-menu>
          <div id="aside"></div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
#main {
  display: flex;
  flex-flow: row nowrap;
}

#aside {
  height: 100vh;
  width: 100vw;
  border: 1px solid #e65775;
}

.layout-container-demo {
  position: fixed;
  left: 0px;
  top: 0px;

  .el-header {
    position: relative;
    background-color: #b3c0d1;
    color: var(--el-text-color-primary);
  }
  .el-menu {
    border-right: none;
  }
  .el-main {
    padding: 0;
  }
}

.toolbar {
  position: absolute;
  display: inline-flex;
  align-items: center;
  justify-items: center;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
