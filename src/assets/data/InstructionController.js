import {
  Route_AXIOS,
  Route_VUE,
  Route_VUEX,
  Route_VUE_ROUTER,
  Route_GITHUB,
  Route_SOURCE_TREE,
} from "@/router";
import { integratedFetch } from "./DataUtil.js";

export const fehId_00001 = "fehId_00001";
export const InsVueContent = {
  data: {
    id: fehId_00001,
    title: "Vue",
    content: `Vue (讀音 /vjuː/，類似於 view) 是一套用於構建用戶界面的漸進式框架。與其它大型框架不同的是，
    Vue 被設計為可以自底向上逐層應用。 Vue 的核心庫只關注視圖層，不僅易於上手，還便於與第三方庫或既有項目整合。
    另一方面，當與現代化的工具鏈以及各種支持類庫結合使用時，Vue 也完全能夠為複雜的單頁應用提供驅動。
    如果你想在深入學習 Vue 之前對它有更多了解，我們製作了一個視頻，帶你了解其核心概念和一個示例工程。`,
    img: "https://book.vue.tw/assets/img/1-1-vue-logo.402955e1.png",
    refContent: "Vue3使用文件",
    refUrl: "https://v3.cn.vuejs.org/",
  },
};
export const fehId_00002 = "fehId_00002";
export const InsVuexContent = {
  data: {
    id: fehId_00002,
    title: "Vuex",
    content: `Vuex 是一個專為 Vue.js 應用程序開發的狀態管理模式 + 庫。它採用集中式存儲管理應用的所有組件的狀態，並以相應的規則保證狀態以一種可預測的方式發生變化。`,
    img: "https://vuex.vuejs.org/flow.png",
    refContent: "Vuex4使用文件",
    refUrl: "https://vuex.vuejs.org/zh/guide/",
  },
};
export const fehId_00003 = "fehId_00003";
export const InsVueRouterContent = {
  data: {
    id: fehId_00003,
    title: "Vue-Router",
    content: `Vue Router 是 Vue.js 的官方路由。它與 Vue.js 核心深度集成，讓用 Vue.js 構建單頁應用變得輕而易舉。功能包括：
    嵌套路由映射、動態路由選擇、模塊化和基於組件的路由配置、路由參數、展示由 Vue.js 的過渡系統提供的過渡效果、細緻的導航控制、自動激活 CSS 類的鏈接、
    HTML5 history 模式或 hash 模式、可定制的滾動行為、URL 的正確編碼。`,
    img: "https://miro.medium.com/max/1400/1*rHC1ENA5eA5buxmnwHL76Q.jpeg",
    refContent: "Vuex-Router4使用文件",
    refUrl: "https://router.vuejs.org/zh/guide/",
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
    refContent: "Github使用文件",
    refUrl: "https://docs.github.com/cn/get-started",
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
    refContent: "SourceTree使用文件",
    refUrl: " https://www.sourcetreeapp.com/",
  },
};

export const fehId_00006 = "fehId_00006";
export const InsAxiosContent = {
  data: {
    id: fehId_00006,
    title: "Axios",
    content: `Axios 是一個基於 promise 網絡請求庫，作用於node.js 和瀏覽器中。它是 isomorphic 的(即同一套代碼可以運行在瀏覽器和node.js中)。在服務端它使用原生 node.js http 模塊, 而在客戶端 (瀏覽端) 則使用 XMLHttpRequests。特性:從瀏覽器創建XMLHttpRequests、從node.js創建 http 請求、支持 Promise API
    攔截請求和響應、轉換請求和響應數據、取消請求、自動轉換JSON數據、客戶端支持防禦XSRF。`,
    img: "",
    refContent: "Axios使用文件",
    refUrl: "https://axios-http.com/zh/docs/instance",
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
    case Route_AXIOS: {
      return fehId_00006;
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
    case fehId_00006: {
      return integratedFetch(InsAxiosContent);
    }
  }
};
