<template>
  <v-container class="mini-player-background pt-0 pb-0">
    <v-row>
      <v-col
        class="pb-0"
        cols="12"
        align="center"
      >
        <v-btn
          icon
          large
          color="white"
          @click="mediaPlayerClickPrevious"
        >
          <v-icon>
            mdi-skip-backward
          </v-icon>
        </v-btn>
        <v-btn
          icon
          outlined
          x-large
          color="white"
          @click="mediaPlayerClickPlay"
          :loading="this.btnPlay.loading"
          :disabled="this.btnPlay.disabled"
        >
          <v-icon>
            {{ this.btnPlay.isPlayIcon ? 'mdi-play' : 'mdi-pause' }}
          </v-icon>
        </v-btn>
        <v-btn
          icon
          large
          color="white"
          @click="mediaPlayerClickNext"
        >
          <v-icon>
            mdi-skip-forward
          </v-icon>
        </v-btn>
      </v-col>
      <v-col
        cols="12"
        class="pt-0 pr-2 pl-2 pb-0"
      >
        <v-slider
          color="white"
          hide-details
          readonly
          v-model="slider.value"
          :min="this.slider.min"
          :max="this.slider.max"
        />
        <!--v-menu
                class="player-volume"
                top
                offset-y
                :close-on-content-click="false"
        >
          <template v-slot:activator="{ on }">
            <v-btn
                    class="ml-8"
                    icon
                    x-small
                    color="white"
                    v-on="on"
            >
              <v-icon>
                mdi-volume-high
              </v-icon>
            </v-btn>
          </template>
          <v-row class="player-volume">
            <v-col class="pt-0 pb-0">
              <v-slider
                      class="mt-0 mb-0"
                      vertical
                      v-model="volume"
                      min="0"
                      max="100"
                      @change="mediaPlayerChangeVolume"
              />
            </v-col>
          </v-row>
        </v-menu-->
      </v-col>
      <v-col
        class="pt-0 pb-0 white--text"
      >
        <marquee-text
          :duration="4"
          :repeat="4"
          :paused="marqueePaused"
        >
          <p class="mr-12">
            <b>{{ playerMetadata.title }}</b>
            {{ " - " + playerMetadata.artists }}
          </p>
        </marquee-text>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Globals from "@/globals";
import {Howl} from "howler";
import {mapGetters} from "vuex";
import MarqueeText from 'vue-marquee-text-component';

export default Vue.extend({
  name: "Player",
  components: { MarqueeText },
  data: () => ({
    Globals: Globals,
    sound: {} as Howl,
    lblTitle: "No title",
    lblArtists: "No artists",
    btnPlay: {
      isPlayIcon: true,
      loading: false,
      disabled: false
    },
    marqueePaused: true,
    volume: 100,
    slider: {
      min: 0,
      max: 260,
      value: 0,
      intervalId: -1,
    },
  }),
  methods: {
    mediaPlayerClickPrevious: function() {
      this.$store.commit("setSharedPlayerEvent", {id: (this.playerEvent.id + 1), name: "previous"});
    },
    mediaPlayerClickPlay: function() {
      if (this.btnPlay.isPlayIcon) {
        this.playerState.sound.play()
        this.$store.commit("setSharedPlayerEvent", {id: (this.playerEvent.id + 1), name: "play"});
      } else {
        this.playerState.sound.pause()
        this.$store.commit("setSharedPlayerEvent", {id: (this.playerEvent.id + 1), name: "pause"});
      }
    },
    mediaPlayerClickNext: function() {
      this.$store.commit("setSharedPlayerEvent", {id: (this.playerEvent.id + 1), name: "next"});
    },
    mediaPlayerClickLoop: function() {
      this.$store.commit("setSharedPlayerEvent", {id: (this.playerEvent.id + 1), name: "loop"});
    },
    mediaPlayerChangeVolume: function() {
      this.playerState.sound.volume(this.volume / 100.0);
      this.$store.commit("setSharedPlayerState", {...this.playerState, volume: (this.volume / 100.0)});
      this.$store.commit("setSharedPlayerEvent", {id: (this.playerEvent.id + 1), name: "volume"});
    },
    mediaPlayerStartTrackingProgression: function() {
      this.slider.intervalId = setInterval(() => {
        const position = this.playerState.sound.seek();
        if (typeof position === "number") {
          this.slider.value = position;
        }
      }, 1000);
    },
    mediaPlayerStopTrackingProgression: function() {
      if (this.slider.intervalId !== -1) {
        clearInterval(this.slider.intervalId);
      }
    },
    onPlayerLoadEvent: function() {
      this.btnPlay.isPlayIcon = true;
      this.btnPlay.loading = true;
      this.slider.value = 0;
      this.marqueePaused = true;
    },
    onPlayerPlayEvent: function() {
      this.slider.max = this.playerMetadata.duration;
      this.btnPlay.loading = false;
      this.btnPlay.isPlayIcon = false;
      this.marqueePaused = false;
      this.mediaPlayerStartTrackingProgression();
    },
    onPlayerPauseEvent: function() {
      this.btnPlay.isPlayIcon = true;
      this.marqueePaused = true;
      this.mediaPlayerStopTrackingProgression();
    },
    onPlayerVolumeEvent: function() {
      //this.volume =  this.playerVolume;
    },
    onPlayerSeekEvent: function() {
      this.slider.value = this.playerState.seek;
    },
    onPlayerResetEvent: function() {
      this.btnPlay.isPlayIcon = true;
      this.slider.value = 0;
      this.marqueePaused = true;
      this.mediaPlayerStopTrackingProgression();
    }
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
      switch (newValue.name) {
        case "load":
          this.onPlayerLoadEvent();
          break;
        case "previous":
        case "play":
          this.onPlayerPlayEvent();
          break;
        case "pause":
          this.onPlayerPauseEvent();
          break;
        case "next":
        case "loop":
        case "volume":
          this.onPlayerVolumeEvent();
          break;
        case "seek":
          this.onPlayerSeekEvent();
          break;
        case "reset":
          this.onPlayerResetEvent();
          break;
      }
    }
  },
});
</script>

<style>
  .mini-player-background {
    background: #262626;
  }
  .mini-player-volume {
    background-color: rgba(255, 255, 255, 0.80);
  }
</style>
