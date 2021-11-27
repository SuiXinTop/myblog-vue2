import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import animated from "animate.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import VMdEditor from "@kangc/v-md-editor/lib/codemirror-editor";
import "@kangc/v-md-editor/lib/style/codemirror-editor.css";
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";
import Prism from "prismjs";

// codemirror 编辑器的相关资源
import Codemirror from "codemirror";
// mode
import "codemirror/mode/markdown/markdown";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/vue/vue";
// edit
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/matchbrackets";
// placeholder
import "codemirror/addon/display/placeholder";
// active-line
import "codemirror/addon/selection/active-line";
// scrollbar
import "codemirror/addon/scroll/simplescrollbars";
import "codemirror/addon/scroll/simplescrollbars.css";
// style
import "codemirror/lib/codemirror.css";
import createLineNumbertPlugin from "@kangc/v-md-editor/lib/plugins/line-number/index";
import createCopyCodePlugin from "@kangc/v-md-editor/lib/plugins/copy-code/index";
import "@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css";

VMdEditor.Codemirror = Codemirror;

VMdEditor.use(vuepressTheme, {
  Prism,
});
VMdEditor.use(createLineNumbertPlugin());
VMdEditor.use(createCopyCodePlugin());
Vue.use(VMdEditor);
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(animated);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
