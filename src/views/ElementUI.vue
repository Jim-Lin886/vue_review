<template>
  <div class="demo-shadow" :style="{ boxShadow: `var(--el-box-shadow-base)` }">
    <el-button plain>Plain</el-button>
    <el-button type="primary" plain>Primary</el-button>
    <el-button type="success" plain>Success</el-button>
    <el-button type="info" plain>Info</el-button>
    <el-button type="warning" plain>Warning</el-button>
    <el-button type="danger" plain>Danger</el-button>
  </div>
  <div :class="['demo-shadow', 'boradxx']">
    <div id="div1">Item One</div>
    <div id="div2">Item Two</div>
    <div id="div3">Item Three has more content and so has a larger size</div>
    <div id="div1">Item One</div>
    <div id="div2">Item Two</div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.box {
  width: 500px;
  display: flex;
  border: 1px solid red;
}

.box > * {
  flex: 1 1 0;
  border: 1px solid blue;
  box-sizing: border-box;
}

.boradxx {
  border: 1px solid red;
  margin: 10px;
}

.demo-shadow {
  width: 50%;
  display: flex;
  flex-flow: row wrap;
  align-items: stretch;
  justify-items: stretch;
}
.demo-shadow > * {
  flex: 1 1 1;
  border: 1px solid blue;
  box-sizing: border-box;
}
/* #div1 {
  flex: 1 1 auto;
}

#div2 {
  flex: 1 0 auto;
}

#div3 {
  flex: 2 5 auto;
} */
</style>
