import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apis: {
      apps: {
        youtubedl: {
          directLinkData: [],
          songsData: []
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
    },
    getApisAppsYoutubedlSongsData(state) {
      return state.apis.apps.youtubedl.songsData;
    }
  },
  mutations: {
    setApisAppsYoutubedlDirectLinkData: (state, links) => {
      state.apis.apps.youtubedl.directLinkData = links;
    },
    setViewsYoutubedlDirectLinkInputValue: (state, value) => {
      state.views.youtubedl.directLinkInputValue = value;
    },
    setApisAppsYoutubedlSongsData(state, value) {
      state.apis.apps.youtubedl.songsData = value;
    }
  },
  actions: {},
  modules: {}
});
