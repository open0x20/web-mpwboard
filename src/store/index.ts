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
        player: {
          track: {},
          progress: 0,
          isPlaying: false,
        },
        directLinkInputValue: "",
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
    },
    getViewsYoutubedlPlayerTrack(state) {
      return state.views.youtubedl.player.track;
    },
    getViewsYoutubedlPlayerProgress(state) {
      return state.views.youtubedl.player.progress;
    },
    getViewsYoutubedlPlayerIsPlaying(state) {
      return state.views.youtubedl.player.isPlaying;
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
    },
    setViewsYoutubedlPlayerTrack(state, value) {
      state.views.youtubedl.player.track = value;
    },
    setViewsYoutubedlPlayerProgress(state, value) {
      state.views.youtubedl.player.progress = value;
    },
    setViewsYoutubedlPlayerIsPlaying(state, value) {
      state.views.youtubedl.player.isPlaying = value;
    }
  },
  actions: {},
  modules: {}
});
