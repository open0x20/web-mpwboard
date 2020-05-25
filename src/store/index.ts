import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apis: {
      apps: {
        youtubedl: {
          directLinkData: [],
          songsData: [],
          artistsData: []
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
    },
    getApisAppsYoutubedlArtistsData(state) {
      return state.apis.apps.youtubedl.artistsData;
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
    },
    setApisAppsYoutubedlArtistsData(state, value) {
      state.apis.apps.youtubedl.artistsData = value;
    }
  },
  actions: {},
  modules: {}
});
