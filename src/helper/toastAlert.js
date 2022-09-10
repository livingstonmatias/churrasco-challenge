import Vue from "vue";
import vuetify from "@/plugins/vuetify";
import { insertElement } from "@/helper/insertDOMElement";
import AlertFeedback from "@/components/ui/Alert.vue";

function toastAlert({ timer = "2000", type = "info", message = "" }) {
  insertElement({});

  return new Vue({
    vuetify,
    render: (h) => h(AlertFeedback, { props: { timer, type, message } }),
  }).$mount("#feedback");
}
export { toastAlert };
