import {
  Route_VUE,
  Route_VUEX,
  Route_VUE_ROUTER,
  Route_GITHUB,
  Route_SOURCE_TREE,
} from "@/router";

export const errMsg = {
  errCode: "E0001--01",
  errStr: "Occurred Error",
};
export const fehId_00001 = "fehId_00001";
export const InsVueContent = {
  data: {
    id: fehId_00001,
    title: "Vue",
    content: `Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，
    Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。
    另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。
    如果你想在深入学习 Vue 之前对它有更多了解，我们制作了一个视频，带你了解其核心概念和一个示例工程。`,
    img: "https://book.vue.tw/assets/img/1-1-vue-logo.402955e1.png",
  },
};
export const fehId_00002 = "fehId_00002";
export const InsVuexContent = {
  data: {
    id: fehId_00002,
    title: "Vuex",
    content: `Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式 + 库。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。`,
    img: "https://vuex.vuejs.org/flow.png",
  },
};
export const fehId_00003 = "fehId_00003";
export const InsVueRouterContent = {
  data: {
    id: fehId_00003,
    title: "Vue-Router",
    content: `Vue Router 是 Vue.js 的官方路由。它与 Vue.js 核心深度集成，让用 Vue.js 构建单页应用变得轻而易举。功能包括：

    嵌套路由映射
    动态路由选择
    模块化、基于组件的路由配置
    路由参数、查询、通配符
    展示由 Vue.js 的过渡系统提供的过渡效果
    细致的导航控制
    自动激活 CSS 类的链接
    HTML5 history 模式或 hash 模式
    可定制的滚动行为
    URL 的正确编码`,
    img: "https://miro.medium.com/max/1400/1*rHC1ENA5eA5buxmnwHL76Q.jpeg",
  },
};
export const fehId_00004 = "fehId_00004";
export const InsGithubContent = {
  data: {
    id: fehId_00004,
    title: "Github",
    content: `GitHub是透過Git進行版本控制的軟體原始碼代管服務平台，由GitHub公司（曾稱Logical Awesome）的開發者Chris Wanstrath、P. J. Hyett和湯姆·普雷斯頓·沃納使用Ruby on Rails編寫而成。

    GitHub同時提供付費帳戶和免費帳戶。這兩種帳戶都可以建立公開或私有的代碼倉庫，但付費使用者擁有更多功能。根據在2009年的Git使用者調查，GitHub是最流行的Git存取站點。[2]除了允許個人和組織建立和存取保管中的代碼以外，
    它也提供了一些方便社會化共同軟體開發的功能，即一般人口中的社群功能，包括允許使用者追蹤其他使用者、組織、軟體庫的動態，對軟體代碼的改動和bug提出評論等。GitHub也提供了圖表功能，用於概觀顯示開發者們怎樣在代碼庫上工作以及軟體的開發活躍程度。`,
    img: "http://wiki.csie.ncku.edu.tw/use-git-01.png",
  },
};
export const fehId_00005 = "fehId_00005";
export const InsSourceTreeContent = {
  data: {
    id: fehId_00005,
    title: "SourceTree",
    content: `SourceTree 是 Windows 和Mac OS X 下免費的 Git 和 Hg 客户端管理工具，同時也是Mn版本控制系統工具。支持創建、克隆、提交、push、pull 和合並等操作。
    SourceTree擁有一個精美簡潔的界面，大大簡化了開發者與代碼庫之間的Git操作方式，這對於那些不熟悉Git命令的開發者來説非常實用。
    SourceTree擁有完整的Git功能：
    通過一個簡單的用户界面即可使用所有的Git命令
    通過一次單擊，即可管理所有的Git庫，無論是託管的還是本地的
    通過一次單擊，即可進行commit、push、pull、merge等操作
    一些先進的功能，如補丁處理、rebase、shelve、cherry picking等
    可以連接到你託管在Bitbucket、Stash、Microsoft TFS或GitHub中的代碼庫`,
    img: "https://blog.sourcetreeapp.com/files/2019/01/1a-768x488.png",
  },
};

export const getFehIdByType = (type) => {
  switch (type) {
    case Route_VUE: {
      return fehId_00001;
    }
    case Route_VUEX: {
      return fehId_00002;
    }
    case Route_VUE_ROUTER: {
      return fehId_00003;
    }
    case Route_GITHUB: {
      return fehId_00004;
    }
    case Route_SOURCE_TREE: {
      return fehId_00005;
    }
  }
};

export const getInsVueContentById = (id) => {
  switch (id) {
    case fehId_00001: {
      return integratedFetch(InsVueContent);
    }
    case fehId_00002: {
      return integratedFetch(InsVuexContent);
    }
    case fehId_00003: {
      return integratedFetch(InsVueRouterContent);
    }
    case fehId_00004: {
      return integratedFetch(InsGithubContent);
    }
    case fehId_00005: {
      return integratedFetch(InsSourceTreeContent);
    }
  }
};

const integratedFetch = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(data);
    }, 1000);

    if (false) {
      returnreject(errMsg);
    }
  });
};
