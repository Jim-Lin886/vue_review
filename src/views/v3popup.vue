<template>
  <div
    ref="elRef"
    v-show="opened"
    class="vui__popup"
    :class="{ 'vui__popup-closed': closeCls }"
    :id="id"
  >
    <!-- //蒙層 -->
    <div
      v-if="JSON.parse(shade)"
      class="vui__overlay"
      @click="shadeClicked"
      :style="{ opacity }"
    ></div>
    <div class="vui__wrap">
      <div class="vui__wrap-section">
        <div
          class="vui__wrap-child"
          :class="[
            'anim-' + anim,
            type && 'popupui__' + type,
            round && 'round',
            position,
          ]"
          :style="[popupStyle]"
        >
          <div v-if="title" class="vui__wrap-tit" v-html="title"></div>
          <div
            v-if="type == 'toast' && icon"
            class="vui__toast-icon"
            :class="['vui__toast-' + icon]"
            v-html="toastIcon[icon]"
          ></div>
          <!-- 判斷插槽是否存在 -->
          <template v-if="$slots.content">
            <div class="vui__wrap-cnt"><slot name="content" /></div>
          </template>
          <template v-else>
            <div v-if="content" class="vui__wrap-cnt" v-html="content"></div>
          </template>
          <slot />
          <div v-if="btns" class="vui__wrap-btns">
            <span
              v-for="(btn, index) in btns"
              :key="index"
              class="btn"
              :style="btn.style"
              @click="btnClicked($event, index)"
              v-html="btn.text"
            ></span>
          </div>
          <span
            v-if="xclose"
            class="vui__xclose"
            :class="xposition"
            :style="{ color: xcolor }"
            @click="close"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

/** * @Desc Vue3.0自定義彈層V3Popup * @Time andy by 2020-12 * @About
Q：282310962 wx：xy190310 */
<script>
import { onMounted, ref, reactive, watch, toRefs, nextTick } from "vue";
let $index = 0,
  $locknum = 0,
  $timer = {};
export default {
  props: {
    // 接收父元件v-model值，如果v-model:open，則這裡需寫open: {...}
    modelValue: { type: Boolean, default: false },
    // 識別符號，相同ID共享一個例項
    id: {
      type: String,
      default: "",
    },
    title: String,
    content: String,
    type: String,
    popupStyle: String,
    icon: String,
    shade: { type: [Boolean, String], default: true },
    shadeClose: { type: [Boolean, String], default: true },
    opacity: { type: [Number, String], default: "" },
    round: Boolean,
    xclose: Boolean,
    xposition: { type: String, default: "right" },
    xcolor: { type: String, default: "#333" },
    anim: { type: String, default: "scaleIn" },
    position: String,
    follow: { type: Array, default: null },
    time: { type: [Number, String], default: 0 },
    zIndex: { type: [Number, String], default: "8080" },
    teleport: [String, Object],
    btns: {
      type: Array,
      default: null,
    },
    onSuccess: { type: Function, default: null },
    onEnd: { type: Function, default: null },
  },
  emits: ["update:modelValue"],
  setup(props, context) {
    const elRef = ref(null);

    const data = reactive({
      opened: false,
      closeCls: "",
      toastIcon: {},
    });

    onMounted(() => {});

    // 監聽彈層v-model
    watch(
      () => props.modelValue,
      (val) => {
        if (val) {
          open();
        } else {
          close();
        }
      }
    );

    // 開啟彈層
    const open = () => {
      if (data.opened) return;
      data.opened = true;
      typeof props.onSuccess === "function" && props.onSuccess();

      const dom = elRef.value;
      dom.style.zIndex = getZIndex() + 1;

      // 倒數計時
      if (props.time) {
        $index++;
        // 避免重複操作
        if ($timer[$index] !== null) clearTimeout($timer[$index]);
        $timer[$index] = setTimeout(() => {
          close();
        }, parseInt(props.time) * 1000);
      }

      // 長按|右鍵選單
      if (props.follow) {
      }
    };

    // 關閉彈層
    const close = () => {
      if (!data.opened) return;

      data.closeCls = true;
      setTimeout(() => {
        context.emit("update:modelValue", false);
        typeof props.onEnd === "function" && props.onEnd();
      }, 200);
    };

    // 點選遮罩層
    const shadeClicked = () => {
      if (JSON.parse(props.shadeClose)) {
        close();
      }
    };
    // 按鈕事件
    const btnClicked = (e, index) => {
      let btn = props.btns[index];
      if (!btn.disabled) {
        typeof btn.click === "function" && btn.click(e);
      }
    };

    return {
      ...toRefs(data),
      elRef,
      close,
      shadeClicked,
      btnClicked,
    };
  },
};
</script>
