import Vue from "vue";
import Vuex from "vuex";
import {Howl} from "howler";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apis: {
      apps: {
        atac: {
          directLinkData: [],
          songsData: [],
          artistsData: []
        }
      }
    },
    views: {
      atac: {
        directLinkInputValue: "",
      }
    },
    shared: {
      player: {
        event: { id: 0, event: ""},
        state: {
          track: {},
          sound: {} as Howl,
          volume: 100,
          seek: 0,
          loaded: false,
        },
        metadata: {
          title: "No title",
          artists: "No Artists",
          duration: 260,
          img: ""
        }
      },
    }
  },
  getters: {
    getApisAppsAtacDirectLinkData(state) {
      return state.apis.apps.atac.directLinkData;
    },
    getViewsAtacDirectLinkInputValue(state) {
      return state.views.atac.directLinkInputValue;
    },
    getApisAppsAtacSongsData(state) {
      return state.apis.apps.atac.songsData;
    },
    getApisAppsAtacArtistsData(state) {
      return state.apis.apps.atac.artistsData;
    },
    getSharedPlayerEvent(state) {
      return state.shared.player.event;
    },
    getSharedPlayerState(state) {
      return state.shared.player.state;
    },
    getSharedPlayerMetadata(state) {
      return state.shared.player.metadata;
    },
  },
  mutations: {
    setApisAppsAtacDirectLinkData: (state, links) => {
      state.apis.apps.atac.directLinkData = links;
    },
    setViewsAtacDirectLinkInputValue: (state, value) => {
      state.views.atac.directLinkInputValue = value;
    },
    setApisAppsAtacSongsData(state, value) {
      state.apis.apps.atac.songsData = value;
    },
    setApisAppsAtacArtistsData(state, value) {
      state.apis.apps.atac.artistsData = value;
    },
    setSharedPlayerEvent(state, value) {
      state.shared.player.event = value;
    },
    setSharedPlayerState(state, value) {
      state.shared.player.state = value;
    },
    setSharedPlayerMetadata(state, value) {
      state.shared.player.metadata = value;
    }
  },
  actions: {},
  modules: {}
});
