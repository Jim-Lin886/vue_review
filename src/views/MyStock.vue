<script>
import { ref, reactive, watch, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { CircleCheck, Delete } from "@element-plus/icons-vue";
import { apiGetCompanyList } from "../axios";
import { getStorcktwInfo } from "../assets/data/Stocktw.js";
export default {
  emits: ["mystock-confirm"],
  setup() {
    /** icon 勾勾 */
    const iconCheck = CircleCheck;
    /** icon 叉叉 */
    const iconDelete = Delete;

    const store = useStore();
    const router = useRouter();

    const searchText = ref("   ");
    let originCompanyList = {};
    const companyListTitle = ref("");
    const companyListField = reactive({ data: [] });

    const companyList = computed(() => {
      searchText.value; //監聽修改用
      if (originCompanyList.data) {
        if (searchText.value.length > 0) {
          return originCompanyList.data.filter((item) => {
            return item.toString().indexOf(searchText.value) > -1;
          });
        }
        return originCompanyList.data.slice(0, 100);
      }
      return [];
    });

    // const getApiGetCompanyList = async () => {
    //   try {
    //     let res = await apiGetCompanyList();
    //     originCompanyList = res.data;
    //     companyListTitle.value = originCompanyList.title;
    //     companyListField.data = originCompanyList.fields;
    //     searchText.value = "";
    //   } catch (error) {}
    // };

    const getApiGetCompanyList = async () => {
      try {
        let res = await getStorcktwInfo();
        originCompanyList = res.data;
        companyListTitle.value = originCompanyList.title;
        companyListField.data = originCompanyList.fields;
        searchText.value = "";
      } catch (error) {}
    };

    const handlerSearchTextEnter = (e) => {
      searchText.value = e.target.value;
    };

    const handlerAdd = (index, row) => {
      let addItem = {
        stockId: row[0],
        stockName: row[1],
        tradeCount: row[2],
        tradePrice: row[3],
        startPrice: row[4],
        highPrice: row[5],
        lowPrice: row[6],
        endPrice: row[7],
      };
      fnAddTags(addItem);
    };

    const tags = reactive({ data: [] });

    const handlerCloaseTag = (tag) => {
      fnRemoveTags(tag);
    };

    const fnAddTags = (tag) => {
      let check = fnGetTags(tag.stockId);
      if (check.length === 0) {
        tags.data.push(tag);
      }
    };

    const fnGetTags = (id) => {
      let find = tags.data.filter((item) => item.stockId === id);
      return find;
    };

    const fnRemoveTags = (tag) => {
      for (var i = 0; i < tags.data.length; i++) {
        if (tags.data[i].stockId === tag.stockId) {
          tags.data.splice(i, 1);
        }
      }
    };

    const handlerConfirm = () => {
      store.dispatch("stockStore/setSaleList", tags.data);
      router.push({ path: `/main/salelist` });
    };

    const handlerRemove = () => {
      if (tags.data.length > 0) {
        tags.data.splice(0, tags.data.length);
      }
      store.dispatch("stockStore/clanSaleList");
    };
    onMounted(() => {
      tags.data = [...store.getters["stockStore/getSaleList"]];
      getApiGetCompanyList();
    });

    return {
      iconCheck,
      iconDelete,
      searchText,
      companyListTitle,
      companyListField,
      companyList,
      handlerSearchTextEnter,
      handlerAdd,
      tags,
      handlerCloaseTag,
      handlerConfirm,
      handlerRemove,
    };
  },
};
</script>
<template>
  <el-container style="padding: 10px; height: 100%">
    <el-header style="height: 40px"
      ><span> 關鍵字搜尋 </span>
      <input
        class="el-input__inner"
        style="width: 30%"
        type="text"
        v-model.lazy="searchText"
        placeholder="未輸入內容僅顯示前一百筆"
        @keydown.enter="handlerSearchTextEnter($event)"
      />
    </el-header>
    <el-main style="height: 100%; widht: 100%"
      ><div>
        <h1>{{ companyListTitle }}</h1>
        <el-table :data="companyList" style="width: 100%">
          <el-table-column label="">
            <template #default="scope">
              <el-button
                size="small"
                @click="handlerAdd(scope.$index, scope.row)"
                >+</el-button
              >
            </template>
          </el-table-column>
          <el-table-column
            v-for="(item, index) in companyListField.data"
            :key="item"
            :label="item"
            width="180"
          >
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <!-- <el-icon><timer /></el-icon> -->
                <span style="margin-left: 10px">{{ scope.row[index] }}</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div></el-main
    >
    <el-footer>
      <el-tag
        style="paddingright: 10px"
        v-for="tag in tags.data"
        :key="tag.stockId"
        class="mx-1"
        size="large"
        closable
        @close="handlerCloaseTag(tag)"
      >
        {{ tag.stockId }}-{{ tag.stockName }}
      </el-tag>
      <el-button
        v-show="tags.data.length > 0"
        size="large"
        type="success"
        :icon="iconCheck"
        circle
        @click="handlerConfirm"
      />
      <el-button
        v-show="tags.data.length > 0"
        size="large"
        type="danger"
        :icon="iconDelete"
        circle
        @click="handlerRemove"
      />
    </el-footer>
  </el-container>

  <router-view></router-view>

  <!-- <el-drawer v-model="isOpenDrawer" :direction="rtl" modal="false">
    <template #title>
      <h4>set title by slot</h4>
    </template>
    <template #default>
      <div>content</div>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="handlerRemove">Remove</el-button>
        <el-button type="primary" @click="handlerConfirm">Confirm</el-button>
      </div>
    </template>
  </el-drawer> -->
</template>

<style></style>
