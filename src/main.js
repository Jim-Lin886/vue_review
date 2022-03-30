import { createApp, onMounted } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import i18n from "./i18n";
import router from "./router";
import store from "./store";
import App from "./App.vue";

const app = createApp(App);

app.directive("setfoucs", {
  // 指令具有一组生命周期钩子：
  // 在绑定元素的 attribute 或事件监听器被应用之前调用
  created() {},
  // 在绑定元素的父组件挂载之前调用
  beforeMount() {},
  // 在绑定元素的父组件挂载之后调用
  mounted(el, binding) {
    console.log("setfoucs", el);
    //<input type="text" v-setfoucs:value="200" value="100"/>
    //el['value'] = '200';
    // el[binding.arg] = binding.value;
    el.focus();
  },
  // 在包含组件的 VNode 更新之前调用
  beforeUpdate(el) {
    console.log("beforeUpdate");
  },
  // 在包含组件的 VNode 及其子组件的 VNode 更新之后调用
  updated(el) {
    console.log("updated");
  },
  // 在绑定元素的父组件卸载之前调用
  beforeUnmount() {},
  // 在绑定元素的父组件卸载之后调用
  unmounted() {},
});

// app.config.errorHandler = (err, vm, info) => {
//   // alert(info);
//   // 处理错误
//   // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
// };

app.config.warnHandler = (msg, vs, trace) => {
  // `trace` 是组件的继承关系追踪
};
app.use(i18n).use(ElementPlus).use(store).use(router).mount("#app");
