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
  getters: {
    getApisAppsYoutubedlDirectLinkData(state) {
      return state.apis.apps.youtubedl.directLinkData;
    },
    getViewsYoutubedlDirectLinkInputValue(state) {
      return state.views.youtubedl.directLinkInputValue;
    }
  },
  mutations: {
    setApisAppsYoutubedlDirectLinkData: (state, links) => {
      state.apis.apps.youtubedl.directLinkData = links;
    },
    setViewsYoutubedlDirectLinkInputValue: (state, value) => {
      state.views.youtubedl.directLinkInputValue = value;
    }
  },
  actions: {},
  modules: {}
});
