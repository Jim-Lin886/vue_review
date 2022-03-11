<script>
export default {};
</script>
<template>
  <div class="container">
    <div class="item">
      <h1>{{ $t("label.description") }}</h1>
      <p>
        該網站使用Vue框架，結合官方推薦的生態系統插件和其他第三方插件開發。用意在整合學習到的技術應用於實務上和熟悉工具的使用。
      </p>
      <ul>
        <li>編輯器：VScode</li>
        <li>框架：Vue3</li>
        <li>插件：Vuex、Vue-Router、AXIOS、Element-UI Plus</li>
        <li>版控：Git、Github、SourceTree</li>
      </ul>
      <img src="../assets/logo.png" alt="" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  background: #dcdde1;
  position: relative;
  text-align: left;
}
.item {
  width: 70%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  padding: 10px;
  background: #fff;
}
h1 {
  font-size: 36px;
  font-weight: bold;
}

p {
  font-weight: bold;
}

img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
