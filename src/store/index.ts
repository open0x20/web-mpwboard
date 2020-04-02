import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apis: {
      apps: {
        youtubedl: {
          directLinks: []
        }
      }
    }
  },
  mutations: {
    setAppsYoutubedlDirectLinks: (state, links) => {
      state.apis.apps.youtubedl.directLinks = links;
    }
  },
  actions: {},
  modules: {}
});
