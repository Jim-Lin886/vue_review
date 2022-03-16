<script>
import { ref, watch } from "vue";
import { Message } from "@element-plus/icons-vue";
import {
  filterByScheduleKind,
  compareCalendarDate,
  SCH_KIND_LOCAL,
  SCH_KIND_GOOGLE,
} from "@/assets/data/CalendarController.js";

export default {
  components: {
    IconMessage: Message,
  },
  props: {
    dataProvider: {
      type: Array,
      default: [],
    },
  },
  emits: {
    calenderSelectDateChange: (selectDate) => {
      if (selectDate) {
        return true;
      }
      return false;
    },
  },
  setup(props, { emit }) {
    const { dataProvider } = props;
    const newProvider = ref([]);
    watch(
      () => props.dataProvider,
      (a, b) => {
        newProvider.value = a;
      }
    );

    const selectDate = ref();
    watch(selectDate, (val, oldVal) => {
      emit("calenderSelectDateChange", { newDate: val, oldDate: oldVal });
    });
    selectDate.value = new Date();

    const cellDisplay = (data, dataProviderxx, schKind) => {
      // console.log("1");
      let sameDate = dataProviderxx
        ? dataProviderxx.filter((item) => {
            // console.log("1-1");
            return compareCalendarDate(item, data.date);
          })
        : null;
      // console.log("2");
      let filterData = filterByScheduleKind(sameDate, schKind);
      // console.log("3");
      return filterData && filterData.length ? filterData.length : 0;
    };

    return {
      newProvider,
      selectDate,
      cellDisplay,
      SCH_KIND_LOCAL,
      SCH_KIND_GOOGLE,
    };
  },
};
</script>

<template>
  <el-calendar v-model="selectDate">
    <template #dateCell="{ data }">
      <div>
        <p>
          {{ data.date.getDate() }}
        </p>

        <span v-if="cellDisplay(data, newProvider, SCH_KIND_LOCAL) > 0">
          <p class="countColor">
            <el-icon :size="25"><icon-message /></el-icon>
            {{ cellDisplay(data, newProvider, SCH_KIND_LOCAL) }}
          </p>
        </span>
        <span v-if="cellDisplay(data, newProvider, SCH_KIND_GOOGLE) > 0">
          <p class="countColor">
            <img
              style="width: 25px; height: 25px"
              alt=""
              src="@/assets/images/google.png"
            />
            {{ cellDisplay(data, newProvider, SCH_KIND_GOOGLE) }}
          </p>
        </span>
      </div>
    </template>
  </el-calendar>
  <!-- <div>{{ newProvider }}</div> -->
</template>
<style lang="scss" scoped>
p {
  margin: 0;
}
.countColor {
  color: #ff9f43;
}
</style>
