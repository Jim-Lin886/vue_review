<script>
import { useI18n } from "vue-i18n";
import { computed, reactive } from "vue";
import { useStore } from "vuex";
import { item_tw, item_en } from "../i18n";
export default {
  setup() {
    const { t } = useI18n();
    const store = useStore();
    const langList = reactive([item_tw, item_en]);

    const handChange = (val) => {
      console.log("handChangeg", val);
      selectLang = val.code;
    };

    const selectLangxxx = ref("");
    const selectLang = computed({
      get: () => {
        store.getters.getLang;
      },
      set: (val) => {
        // store.dispatch("commitLang", val);
      },
    });

    return { t, langList, selectLang, handChange, selectLang };
  },
};
</script>
<template>
  <el-select
    v-model="selectLangxxx"
    :placeholder="$t('message.select')"
    @change="handChange"
    ><el-option
      v-for="item in langList"
      :key="item.code"
      :label="item.key"
      :value="code"
    >
      <span>{{ `${item.code}-${item.key}` }}</span>
    </el-option></el-select
  >
</template>

<style></style>
