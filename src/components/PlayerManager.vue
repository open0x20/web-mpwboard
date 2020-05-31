<template>
  <div></div>
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
      if (this.playerLoaded) {
        this.playerSound.stop();
      } else {
        this.$store.commit("setViewsYoutubedlPlayerLoaded", true);
      }

      // Load new song
      this.$store.commit("setViewsYoutubedlPlayerSound", new Howl({
        src: [Globals.API_URL__YTDL_CONVERTER + "/stream/" + this.playerTrack.trackId + "?name=player"],
        format: ["mp3"]
      }));
      this.playerSound.volume(this.playerVolume / 100);

      // Load Metadata stuff
      this.$store.commit("setViewsYoutubedlPlayerMetadataTitle", this.playerTrack.title);
      this.$store.commit("setViewsYoutubedlPlayerMetadataImg", this.playerTrack.urlCover);
      let artists = this.playerTrack.artists.join(", ");
      if (this.playerTrack.featuring.length > 0) {
        artists += " ft. " + this.playerTrack.featuring.join(", ");
      }
      this.$store.commit("setViewsYoutubedlPlayerMetadataArtists", artists);

      // Play new song upon being loaded
      this.$store.commit("setViewsYoutubedlPlayerEvent", {id: (this.playerEvent.id + 1), name: "load"});
      this.playerSound.once("load", () => {
        //this.btnPlay.loading = false;
        this.$store.commit("setViewsYoutubedlPlayerMetadataDuration", this.playerSound.duration());
        this.$store.commit("setViewsYoutubedlPlayerEvent", {id: (this.playerEvent.id + 1), name: "play"});
        this.playerSound.play();
        this.playerSound.once("end", () => {
          this.$store.commit("setViewsYoutubedlPlayerEvent", {id: (this.playerEvent.id + 1), name: "reset"});
        });
      });
    },
  },
  mounted() {
    //
  },
  computed: {
    ...mapGetters({
      playerEvent: "getViewsYoutubedlPlayerEvent",
      playerSound: "getViewsYoutubedlPlayerSound",
      playerVolume: "getViewsYoutubedlPlayerVolume",
      playerTrack: "getViewsYoutubedlPlayerTrack",
      playerLoaded: "getViewsYoutubedlPlayerLoaded",
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
