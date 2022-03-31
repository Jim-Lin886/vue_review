<script>
import { computed, onMounted, onUnmounted, reactive, ref, watch } from "vue";
import { Message } from "@element-plus/icons-vue";
import { ElMessageBox } from "element-plus";
import {
  GoogleCalendarFormat,
  getCalendarInfo,
  compareCalendarDate,
} from "../assets/data/CalendarController.js";
import {
  getfirstDayOnMonth,
  getLastDayOnMonth,
} from "../components/util/DateUtility.js";

import Calender from "../components/date/Calender.vue";
export default {
  components: {
    Calender,
    IconMessage: Message,
  },
  setup() {
    const dataProvider = reactive({ data: [] });
    let calendarDate = ref();
    watch(calendarDate, (val, oldVal) => {
      fetching.value = false;
    });

    const calendarSchedule = computed(() => {
      if (
        calendarDate.value &&
        dataProvider &&
        dataProvider.data &&
        dataProvider.data.length > 0
      ) {
        let sameDate = dataProvider.data
          ? dataProvider.data.filter((item) => {
              return compareCalendarDate(item, calendarDate.value);
            })
          : null;
        return sameDate;
      }
      return [];
    });

    const handSelectDateChange = async (val) => {
      try {
        const { newDate, oldDate } = val;
        calendarDate.value = newDate;

        let newMon = newDate ? newDate.getMonth() : -1;
        let oldMon = oldDate ? oldDate.getMonth() : -1;
        if (newMon !== oldMon) {
          let res = await getCalendarInfo(newDate.getMonth());
          dataProvider.data = res.data;
        }
      } catch (error) {
        dataProvider.data = [];
      }
    };

    const CLIENT_ID =
      "733344766271-72i517pd0g2n1hfqnb7oj8tcg3cf1cbc.apps.googleusercontent.com";
    const API_KEY = "AIzaSyDfUNavm7BLmyL91Q4RP4LlsbMFZCZzQq4";
    const DISCOVERY_DOCS = [
      "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
    ];
    const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

    let api = null;
    const authorized = ref(false);
    const fetching = ref(false);
    const fetchStatus = ref("label.login");

    const fnClientLoad = () => {
      // console.log("fnClientLoad", api);
      api.load("client:auth2", fnInitClient);
    };

    const fnInitClient = () => {
      // console.log("fnInitClient", api);
      api.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
        .then((res) => {
          api.auth2.getAuthInstance().isSignedIn.listen(authorized);
          // console.log(" api.client-init-then", res);
        });
    };

    const apiGetCalenderInfo = (timeMin, timeMax) => {
      // console.log("apiGetCalenderInfo", api.client.calendar.events);
      fetching.value = false;
      api.client.calendar.events
        .list({
          calendarId: "primary",
          timeMin: timeMin.toISOString(),
          timeMax: timeMax.toISOString(),
          // timeMin: "2013-10-01T00:00:00+10:00",
          showDeleted: false,
          singleEvents: true,
          maxResults: 10,
          orderBy: "startTime",
        })
        .then((response) => {
          let items = response.result.items.map(
            (ele) => new GoogleCalendarFormat(ele)
          );
          fnAfterApiGetCalenderInfo(items);
          // console.log("apiGetCalenderInfo", items);
        })
        .catch((error) => {
          console.log("apiGetCalenderInfo-error", error);
          ElMessageBox.alert(
            error.response.parameters.quotaUser.description,
            "error",
            {
              type: "error",
            }
          );
        });
    };

    const fnAfterApiGetCalenderInfo = async (items) => {
      // console.log("1");
      let merge = [];
      let locSch = await getCalendarInfo(calendarDate.value.getMonth());
      // console.log("2", locSch);
      if (locSch.data && locSch.data.length > 0) {
        // console.log("3");
        merge = locSch.data;
      }
      if (items && items.length > 0) {
        // console.log("4");
        merge = merge.concat(items);
        // console.log("5");
      }
      // console.log("6");
      dataProvider.data = merge;
      fetching.value = true;
      // console.log("7");
    };

    const handleAuthClick = () => {
      Promise.resolve(api.auth2.getAuthInstance().signIn())
        .then((res) => {
          authorized.value = true;
          // console.log("handleAuthClick");
        })
        .catch((err) => {
          console.log("handleAuthClick-error11", err);
          ElMessageBox.alert(err.error, "error", {
            type: "error",
          });
        });
    };

    const handleSignOutClick = () => {
      Promise.resolve(api.auth2.getAuthInstance().signOut()).then((res) => {
        authorized.value = false;
      });
    };

    const handlerFeachClick = () => {
      let firstDay = getfirstDayOnMonth(new Date());
      let lastDay = getLastDayOnMonth(new Date());
      apiGetCalenderInfo(firstDay, lastDay);
    };

    const stepValue = computed(() => {
      if (!authorized.value) {
        fetchStatus.value = "label.login";
        // console.log("登入");
        return 1;
      }
      if (fetching.value) {
        fetchStatus.value = "label.reload";
        // console.log("讀取");
        return 3;
      }
      // console.log("重新讀取");
      fetchStatus.value = "label.load";
      return 2;
    });
    const handStepsClick = () => {
      if (!authorized.value) {
        handleAuthClick();
      } else {
        handlerFeachClick();
      }
    };

    onMounted(() => {
      api = window.gapi;
      fnClientLoad();
    });

    onUnmounted(() => {
      handleSignOutClick();
    });

    return {
      stepValue,
      dataProvider,
      calendarSchedule,
      handStepsClick,
      authorized,
      fetchStatus,
      handleAuthClick,
      handleSignOutClick,
      handlerFeachClick,
      apiGetCalenderInfo,
      handSelectDateChange,
    };
  },
};
</script>
<template>
  <div class="container">
    <div class="item">
      <div class="toolBar">
        <div id="btnBar">
          {{ $t("label.importGoogleCalendar") }}
          <el-button @click="handStepsClick">{{ $t(fetchStatus) }}</el-button>
          <el-button v-if="authorized" @click="handleSignOutClick">{{
            $t("label.logout")
          }}</el-button>
        </div>
        <div>
          <el-steps
            :space="260"
            :active="stepValue"
            finish-status="success"
            align-center
          >
            <el-step :title="$t('label.noLogin')" />
            <el-step :title="$t('label.login')" />
            <el-step :title="$t('label.done')" />
          </el-steps>
        </div>
      </div>

      <calender
        :dataProvider="dataProvider.data"
        @calenderSelectDateChange="handSelectDateChange"
      />
    </div>

    <hr class="divider" />

    <div class="item">
      <h1 v-if="calendarSchedule.length === 0" style="text-align: center">
        {{ $t("message.noDataFound") }}
      </h1>
      <el-timeline>
        <el-timeline-item
          v-for="item in calendarSchedule"
          :key="item.id"
          :timestamp="item.startDateTime"
          placement="top"
        >
          <el-card>
            <h3>
              <el-icon
                v-if="item.kind.toString().indexOf('local') > -1"
                :size="18"
                ><icon-message
              /></el-icon>
              <img
                v-else
                style="width: 18px; height: 18px"
                alt=""
                src="@/assets/images/google.png"
              />
              {{ `${item.description}` }}
            </h3>
            <p>
              {{ $t("label.createdDateTime") }}
              {{ ` ${item.createdDateTime}, ${item.creatorName}` }}
            </p>
            <p>{{ `${item.creatoEmail}` }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<style lang="scss" src="../assets/style/instrunctionTwoRow.scss" scoped>
.toolBar {
  button {
    margin: 10px;
  }
}

@media screen and (max-width: 700px), (orientation: portrait) {
  .toolBar {
    display: flex;
    flex-direction: column-reverse;
    padding-top: 10px;
    justify-content: center;

    * {
      flex: auto;
      justify-content: flex-start;
    }

    button {
      margin: 10px;
    }
  }
}

h2 {
  margin-block: 0px;
}
</style>
