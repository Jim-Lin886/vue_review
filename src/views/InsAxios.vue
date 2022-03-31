<script>
import { onMounted, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { xmlToJson } from "../components/FormatUtil.js";
import { cityConvertion } from "../assets/data/LocalName.js";
import Instruction from "../components/Instruction.vue";
// import { useStore } from "vuex";

import { apiGetWeather, apiGetCityList, apiGetTownList } from "../axios";
export default {
  components: {
    Instruction,
  },
  setup() {
    const props = {
      label: "datasetDescription",
      children: "children",
    };
    /** route */
    const route = useRoute();
    /** 查詢功能資訊的fehId */
    const fehId = ref(route.params.fehId);

    /** 城市清單 */
    const cityList = reactive({ data: {} });
    /** 鄉鎮區清單 */
    const townList = reactive({ data: {} });
    /** 天氣資訊 */
    const weatherList = reactive({ data: {} });

    /** 當前選擇城市 */
    const selectCity = ref("");
    watch(selectCity, (val, oldVal) => {
      // console.log("selectCity", val);
      fnGetTowList(val);
    });

    /** 當前選擇鄉鎮區 */
    const selectTown = ref("");
    watch(selectTown, (val, oldVal) => {
      fngetWeather();
    });

    /** 取得城市清單 */
    const fnGetCityList = () => {
      apiGetCityList()
        .then((res) => {
          fnProcCityList(res.data);
        })
        .catch((error) => {});
    };

    /** 取得鄉鎮區清單 */
    const fnGetTowList = async (cityCode) => {
      try {
        const { data } = await apiGetTownList(cityCode);
        fnProcTownList(data);
        // console.log("apiGetTownList", data);
      } catch (error) {}
    };

    /** 取得天氣資訊 */
    const fngetWeather = () => {
      apiGetWeather(cityConvertion[selectCity.value].id, selectTown.value)
        .then((res) => {
          fnProcWeatherOfKH(res.data);
        })
        .catch((error) => {});
    };

    /** 處理城市清單 */
    const fnProcCityList = async (data) => {
      try {
        const obj = await xmlToJson(data);
        cityList.data = obj.countyItems.countyItem;
        // console.log("fnProcCityList", cityList);
      } catch (error) {}
    };

    /** 處理鄉鎮區清單 */
    const fnProcTownList = (data) => {
      townList.data = data;
      // console.log("fnProcTownList", data);
    };

    /** 處理天氣資訊 */
    const fnProcWeatherOfKH = (data) => {
      var str = String(data);
      [
        '"locations"',
        '"location"',
        '"weatherElement"',
        '"time"',
        '"elementValue"',
      ].forEach((item) => {
        let regex = new RegExp(item, "gi");
        str = str.replace(regex, '"children"');
      });
      const jsON = JSON.parse(str);
      weatherList.data = jsON.records.children;
      // console.log(weatherList.data);
    };

    /** 處理天氣資訊每一層的顯示 */
    const fnTreeDisplay = (item) => {
      if (item.hasOwnProperty("datasetDescription")) {
        return item.datasetDescription.toString();
      }
      if (item.hasOwnProperty("locationName")) {
        return item.locationName.toString();
      }
      if (item.hasOwnProperty("description")) {
        return item.description.toString();
      }
      if (item.hasOwnProperty("startTime") && item.hasOwnProperty("endTime")) {
        return `${item.startTime.toString()} ~ ${item.endTime.toString()}`;
      }
      if (item.hasOwnProperty("datasetDescription")) {
        return item.datasetDescription.toString();
      }
      if (item.hasOwnProperty("value") && item.hasOwnProperty("measures")) {
        return `${item.value.toString()} ${item.measures.toString()}`;
      }
      return "";
    };

    const handChange = (e) => {};

    onMounted(() => {
      //初始取城市清單
      fnGetCityList();
    });

    // const store = useStore();
    // console.log(store.getters["apiSotre/getApiMsg"]);
    // watch(
    //   () => store.getters["apiSotre/getApiMsg"],
    //   (a, b) => {
    //     console.log("aa", a, b);
    //   }
    // );

    return {
      props,
      fehId,
      cityList,
      townList,
      weatherList,
      selectCity,
      selectTown,
      fnTreeDisplay,
      handChange,
    };
  },
};
</script>
<template>
  <div class="container">
    <instruction class="item" :fehId="fehId" />
    <hr class="divider" />
    <div class="item">
      <h1>&#64;{{ $t("label.example") }}</h1>
      <ul>
        <li style="font-weight: bold">透過Axios呼叫API取得資料</li>
      </ul>
      <ol>
        <li>建立兩個Axios實體:國土測繪中心、氣象資料開放平臺。</li>
        <li>透過國土測繪中心提供API取得縣市和鄉鎮區清單。</li>
        <li>透過氣象資料開放平臺提供API取得指定地區天氣資訊。</li>
      </ol>
      <el-select
        v-model="selectCity"
        :placeholder="$t('label.city')"
        @change="handChange"
      >
        <el-option
          v-for="item in cityList.data"
          :key="item.countycode01[0]"
          :label="item.countyname[0]"
          :value="item.countycode01[0]"
        >
        </el-option>
      </el-select>
      <el-select v-model="selectTown" :placeholder="$t('label.town')">
        <el-option
          v-for="item in townList.data"
          :key="item.towncode"
          :label="item.townname"
          :value="item.townname"
        >
        </el-option>
      </el-select>

      <el-tree :data="weatherList.data" :props="props">
        <template #default="{ data }">
          <span>{{ fnTreeDisplay(data) }}</span>
        </template>
      </el-tree>
    </div>
  </div>
</template>

<style lang="scss" src="../assets/style/instrunctionTwoRow.scss" scoped></style>
