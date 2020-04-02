import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apis: {
      apps: {
        youtubedl: {
          directLinkData: []
        }
      }
    },
    views: {
      youtubedl: {
        directLinkInputValue: ""
      }
    }
  },
  mutations: {
    setAppsYoutubedlDirectLinks: (state, links) => {
      state.apis.apps.youtubedl.directLinkData = links;
    }
  },
  actions: {},
  modules: {}
});
