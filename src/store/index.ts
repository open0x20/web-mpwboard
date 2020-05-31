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
          event: { id: 0, event: ""},
          track: {},
          sound: {} as Howl,
          volume: 100,
          seek: 0,
          loaded: false,
          metadata: {
            title: "No title",
            artists: "No Artists",
            duration: 260,
            img: ""
          }
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
    getViewsYoutubedlPlayerEvent(state) {
      return state.views.youtubedl.player.event;
    },
    getViewsYoutubedlPlayerTrack(state) {
      return state.views.youtubedl.player.track;
    },
    getViewsYoutubedlPlayerSound(state) {
      return state.views.youtubedl.player.sound;
    },
    getViewsYoutubedlPlayerVolume(state) {
      return state.views.youtubedl.player.volume;
    },
    getViewsYoutubedlPlayerSeek(state) {
      return state.views.youtubedl.player.seek;
    },
    getViewsYoutubedlPlayerLoaded(state) {
      return state.views.youtubedl.player.loaded;
    },
    getViewsYoutubedlPlayerMetadataTitle(state) {
      return state.views.youtubedl.player.metadata.title;
    },
    getViewsYoutubedlPlayerMetadataArtists(state) {
      return state.views.youtubedl.player.metadata.artists;
    },
    getViewsYoutubedlPlayerMetadataDuration(state) {
      return state.views.youtubedl.player.metadata.duration;
    },
    getViewsYoutubedlPlayerMetadataImg(state) {
      return state.views.youtubedl.player.metadata.img;
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
    setViewsYoutubedlPlayerEvent(state, value) {
      state.views.youtubedl.player.event = value;
    },
    setViewsYoutubedlPlayerTrack(state, value) {
      state.views.youtubedl.player.track = value;
    },
    setViewsYoutubedlPlayerSound(state, value) {
      state.views.youtubedl.player.sound = value;
    },
    setViewsYoutubedlPlayerVolume(state, value) {
      state.views.youtubedl.player.volume = value;
    },
    setViewsYoutubedlPlayerSeek(state, value) {
      state.views.youtubedl.player.seek = value;
    },
    setViewsYoutubedlPlayerLoaded(state, value) {
      state.views.youtubedl.player.loaded = value;
    },
    setViewsYoutubedlPlayerMetadataTitle(state, value) {
      state.views.youtubedl.player.metadata.title = value;
    },
    setViewsYoutubedlPlayerMetadataArtists(state, value) {
      state.views.youtubedl.player.metadata.artists = value;
    },
    setViewsYoutubedlPlayerMetadataDuration(state, value) {
      state.views.youtubedl.player.metadata.duration = value;
    },
    setViewsYoutubedlPlayerMetadataImg(state, value) {
      state.views.youtubedl.player.metadata.img = value;
    }
  },
  actions: {},
  modules: {}
});
