<script>
import { computed, reactive, config } from "vue";
import { useStore } from "vuex";
import { item_tw, item_en } from "../i18n";
export default {
  setup() {
    /** vuex */
    const store = useStore();
    /** 語系清單 */
    const langList = reactive([item_tw, item_en]);

    /** 當前選擇語系 */
    const selectLang = computed({
      get: () => {
        return store.getters.getLang;
      },
      set: (val) => {
        store.dispatch("commitLang", val);
      },
    });

    return { langList, selectLang };
  },
};
</script>
<template>
  <el-select v-model="selectLang" :placeholder="$t('message.select')">
    <el-option
      v-for="item in langList"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
      <span>{{ `${item.label}-${item.value}` }}</span>
    </el-option>
  </el-select>
</template>

<style></style>
