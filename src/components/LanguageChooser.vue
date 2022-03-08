<script>
import { computed, reactive, config } from "vue";
import { useStore } from "vuex";
import { item_tw, item_en } from "../i18n";
export default {
  setup() {
    const store = useStore();
    const langList = reactive([item_tw, item_en]);
    console.log("handChangeg", langList);

    const handChange = (val) => {
      selectLang = val.code;
    };

    const selectLang = computed({
      get: () => {
        return store.getters.getLang;
      },
      set: (val) => {
        store.dispatch("commitLang", val);
      },
    });

    return { langList, selectLang, handChange };
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
