<template>
  <div />
</template>

<script lang="ts">
import Vue from "vue";
import Globals from "@/globals";
import {Howl, Howler} from "howler";
import {mapGetters} from "vuex";

export default Vue.extend({
  name: "Player",
  data: () => ({
    Globals: Globals,
  }),
  methods: {
    onPlayerStartEvent: function() {
      // Clear previous
      if (this.playerState.loaded) {
        this.playerState.sound.stop();
      } else {
        this.$store.commit("setSharedPlayerState", {...this.playerState, loaded: true});
      }

      // Load new song
      const sound = new Howl({
        src: [Globals.API_URL__YTDL_CONVERTER + "/stream/" + this.playerState.track.trackId + "?name=player"],
        format: ["mp3"]
      });
      this.$store.commit("setSharedPlayerState", {...this.playerState, sound: sound});
      this.playerState.sound.volume(this.playerState.volume / 100);

      // Load Metadata stuff
      let artists = this.playerState.track.artists.join(", ");
      if (this.playerState.track.featuring.length > 0) {
        artists += " ft. " + this.playerState.track.featuring.join(", ");
      }
      this.$store.commit("setSharedPlayerMetadata", {
        ...this.playerMetadata,
        title: this.playerState.track.title,
        artists: artists,
        img: this.playerState.track.urlCover
      });

      // Play new song upon being loaded
      this.$store.commit("setSharedPlayerEvent", {id: (this.playerEvent.id + 1), name: "load"});
      this.playerState.sound.once("load", () => {
        //this.btnPlay.loading = false;
        this.$store.commit("setSharedPlayerMetadata", {...this.playerMetadata, duration: this.playerState.sound.duration()});
        this.$store.commit("setSharedPlayerEvent", {id: (this.playerEvent.id + 1), name: "play"});
        this.playerState.sound.play();
        this.playerState.sound.once("end", () => {
          this.$store.commit("setSharedPlayerEvent", {id: (this.playerEvent.id + 1), name: "reset"});
        });
      });
    },
  },
  mounted() {
    //
  },
  computed: {
    ...mapGetters({
      playerEvent: "getSharedPlayerEvent",
      playerState: "getSharedPlayerState",
      playerMetadata: "getSharedPlayerMetadata"
    })
  },
  watch: {
    playerEvent: function (newValue) {
      console.log("Player Event: " + newValue.name);
      switch (newValue.name) {
        case "start":
          this.onPlayerStartEvent();
          break;
      }
    }
  },
});
</script>
