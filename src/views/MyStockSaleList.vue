<script>
import { ref, reactive, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Route_MY_STOCK } from "@/router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const titleList = reactive({
      data: [
        { title: "代號", field: "stockId" },
        { title: "股票", field: "stockName" },
        { title: "昨收", field: "endPrice" },
        { title: "折數", field: "discount" },
        { title: "買價", field: "buyPrice" },
        { title: "買量", field: "buyCount" },
        { title: "買價金", field: "buyTotalPrice" },
        { title: "賣價", field: "salePrice" },
        { title: "賣量", field: "saleCount" },
        { title: "賣價金", field: "saleTotalPrice" },
        { title: "當冲", field: "isDayTrand" },
        { title: "差額", field: "profitLoss" },
      ],
    });

    const recordList = reactive({
      data: [],
    });

    const handBackClick = () => {
      router.push({ path: `/main/${Route_MY_STOCK}` });
    };

    const handlerInputChange = (evt, row, field) => {
      if (field === "isDayTrand") {
        let isCheck = row.isDayTrand || false;
        row.isDayTrand = !isCheck;
      } else {
        row[field] = evt.target.value;
      }

      if (
        field === "discount" ||
        field === "buyPrice" ||
        field === "buyCount"
      ) {
        let discount = Number(row.discount) || 0;
        let buyPrice = Number(row.buyPrice) || 0;
        let buyCount = Number(row.buyCount) || 0;
        let buyConut2 = discount * 0.001425;
        row.buyTotalPrice = Math.round(buyPrice * buyCount * (1 + buyConut2));
      } else if (
        field === "discount" ||
        field === "salePrice" ||
        field === "saleCount" ||
        field === "isDayTrand"
      ) {
        let discount = Number(row.discount) || 0;
        let salePrice = Number(row.salePrice) || 0;
        let saleCount = Number(row.saleCount) || 0;
        let buyConut2 = discount * 0.001425;
        let discountPrice = Math.round(salePrice * saleCount * buyConut2) || 0;
        let countPrice = Math.round(salePrice * saleCount) - discountPrice;

        let isDayTrand = row.isDayTrand || false;

        let countTex = isDayTrand ? 0.0015 : 0.003;
        let countTexVale = Math.round(salePrice * saleCount * countTex) || 0;
        row.saleTotalPrice = countPrice - countTexVale;
      }
      let buyTotalPrice = Number(row.buyTotalPrice) || 0;
      let saleTotalPrice = Number(row.saleTotalPrice) || 0;
      row.profitLoss = saleTotalPrice - buyTotalPrice;
    };

    onMounted(() => {
      recordList.data = store.getters["stockStore/getSaleList"];
    });

    return { titleList, recordList, handBackClick, handlerInputChange };
  },
};
</script>
<template>
  <div style="padding: 10px">
    <div style="text-align: right">
      <el-button style="display: inline-block" @click="handBackClick"
        >返回</el-button
      >
    </div>

    <el-table :data="recordList.data" style="width: 100%">
      <el-table-column
        v-for="(item, index) in titleList.data"
        :key="item.field"
        :label="item.title"
      >
        <template #default="scope">
          <p
            v-if="
              index === 0 ||
              index === 1 ||
              index === 2 ||
              index === 6 ||
              index === 9 ||
              index === 11
            "
          >
            {{ scope.row[item.field] }}
          </p>

          <el-checkbox
            v-else-if="index === 10"
            size="large"
            :checked="scope.row[item.field]"
            @change="handlerInputChange($event, scope.row, item.field)"
          />

          <input
            v-else
            class="el-input__inner"
            type="text"
            :value="scope.row[item.field]"
            @change="handlerInputChange($event, scope.row, item.field)"
          />
          <!-- v-model.lazy="scope.row[item.field]" -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style></style>
