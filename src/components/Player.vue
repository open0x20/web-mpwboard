<template>
  <v-container class="player-background pt-0 pb-0">
    <v-row
      justify="space-between"
      align="stretch"
    >
      <!-- Media Player - Metadata --->
      <v-col
        cols="12"
        md="4"
        lg="3"
        xl="2"
      >
        <v-row
          no-gutters
          justify="center"
        >
          <v-col
            cols="auto"
            class="mr-2"
          >
            <v-img
              :src="playerMetadata.img"
              min-height="95"
              max-height="95"
              min-width="95"
              max-width="95"
              class="player-border-radius-4 player-img-holder"
            />
          </v-col>
          <v-col align-self="center">
            <v-row
              no-gutters
              justify="end"
              align="end"
            >
              <v-col>
                <p class="font-weight-regular white--text ma-0">
                  {{ playerMetadata.title }}
                </p>
                <p class="font-weight-light caption white--text ma-0">
                  {{ playerMetadata.artists }}
                </p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <!-- Media Player - Main Controls --->
      <v-col
        cols="12"
        md="8"
        lg="8"
        xl="8"
      >
        <v-row
          no-gutters
        >
          <v-col
            cols="12"
            align="center"
            class="pt-0"
          >
            <v-btn
              class="mr-8"
              icon
              x-small
              color="white"
              @click="mediaPlayerClickPlay"
            >
              <v-icon>
                mdi-shuffle-variant
              </v-icon>
            </v-btn>
            <v-btn
              class="mr-2"
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
              class="ml-2"
              icon
              large
              color="white"
              @click="mediaPlayerClickNext"
            >
              <v-icon>
                mdi-skip-forward
              </v-icon>
            </v-btn>
            <v-menu
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
                <v-col class="pa-1">
                  <v-slider
                    class="mt-0 mb-0"
                    vertical
                    v-model="sliderVolume"
                    min="0"
                    max="100"
                    @change="mediaPlayerChangeVolume"
                  />
                </v-col>
              </v-row>
            </v-menu>
          </v-col>
          <v-col
            cols="12"
            class="pt-0 pr-6 pl-6"
          >
            <v-slider
              color="white"
              hide-details
              v-model="slider.value"
              :min="this.slider.min"
              :max="this.slider.max"
              @click="mediaPlayerClickSlider"
              @start="sliderStartDragging"
              @end="sliderStopDragging"
            >
              <template v-slot:prepend>
                <p class="ma-0 mt-1 pr-2 player-timer">
                  {{ formatAsTime(slider.value) }}
                </p>
              </template>
              <template v-slot:append>
                <p class="ma-0 mt-1 pl-2 player-timer">
                  {{ formatAsTime(slider.max) }}
                </p>
              </template>
            </v-slider>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Globals from "@/globals";
import {mapGetters} from "vuex";

export default Vue.extend({
  name: "Player",
  data: () => ({
    Globals: Globals,
    btnPlay: {
      isPlayIcon: true,
      loading: false,
      disabled: false
    },
    sliderVolume: 100,
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
      this.playerState.sound.volume(this.sliderVolume / 100.0);
      this.$store.commit("setSharedPlayerState", {...this.playerState, volume: this.sliderVolume});
      this.$store.commit("setSharedPlayerEvent", {id: (this.playerEvent.id + 1), name: "volume"});
    },
    mediaPlayerClickSlider: function() {
      this.mediaPlayerStopTrackingProgression();
      this.playerState.sound.seek(this.slider.value);
      this.mediaPlayerStartTrackingProgression();
    },
    sliderStartDragging: function() {
      if (this.slider.intervalId !== -1) {
        this.mediaPlayerStopTrackingProgression();
      }
    },
    sliderStopDragging: function() {
      this.mediaPlayerStartTrackingProgression();
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
    formatAsTime: function(value: number) { // TODO export into helper class
      const minutes = Math.floor(value / 60);
      const seconds = Math.floor(value - (minutes * 60));

      if (seconds < 10) {
        return minutes + ":0" + seconds;
      } else {
        return minutes + ":" + seconds;
      }
    },
    onPlayerLoadEvent: function() {
      this.btnPlay.isPlayIcon = true;
      this.btnPlay.loading = true;
      this.slider.value = 0;
    },
    onPlayerPlayEvent: function() {
      this.slider.max = this.playerMetadata.duration;
      this.btnPlay.loading = false;
      this.btnPlay.isPlayIcon = false;
      this.mediaPlayerStartTrackingProgression();
    },
    onPlayerPauseEvent: function() {
      this.btnPlay.isPlayIcon = true;
      this.mediaPlayerStopTrackingProgression();
    },
    onPlayerVolumeEvent: function() {
      this.sliderVolume =  this.playerState.volume;
    },
    onPlayerSeekEvent: function() {
      this.slider.value = this.playerState.seek;
    },
    onPlayerResetEvent: function() {
      this.btnPlay.isPlayIcon = true;
      this.slider.value = 0;
      this.mediaPlayerStopTrackingProgression();
    }
  },
  mounted() {
    if (this.playerState.loaded) {
      this.sliderVolume =  this.playerState.volume;
      this.slider.value = this.playerState.sound.seek();
      this.slider.max = this.playerMetadata.duration;
      if (this.playerState.sound.playing()) {
        this.onPlayerPlayEvent();
      }
    }
  },
  beforeDestroy() {
    this.mediaPlayerStopTrackingProgression();
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
  .player-background {
    background: #ff8000;;
  }
  .player-img-holder {
    background-color: white;
  }
  .player-border-radius-4 {
    border-radius: 16px 4px 4px 4px;
  }
  .player-timer {
    color: rgba(255, 211, 100, 0.90);
  }
  .player-volume {
    background-color: rgba(255, 255, 255, 0.80);
  }
</style>
