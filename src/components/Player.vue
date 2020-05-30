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
        lg="4"
        xl="4"
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
              src="https://i1.sndcdn.com/artworks-000062402673-f2f2f7-t500x500.jpg"
              min-height="85"
              max-height="85"
              min-width="85"
              max-width="85"
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
                  Electricity
                </p>
                <p class="font-weight-light caption white--text ma-0">
                  Silk City, Dua Lipa ft. Diplo, Mark Ronson
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
              class="mr-10"
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
              icon
              x-large
              color="white"
              @click="mediaPlayerClickPrevious"
            >
              <v-icon>
                mdi-skip-backward
              </v-icon>
            </v-btn>
            <v-btn
              icon
              x-large
              color="white"
              @click="mediaPlayerClickPlay"
            >
              <v-icon>
                {{ this.btnPlay ? 'mdi-play' : 'mdi-pause' }}
              </v-icon>
            </v-btn>
            <v-btn
              icon
              x-large
              color="white"
              @click="mediaPlayerClickNext"
            >
              <v-icon>
                mdi-skip-forward
              </v-icon>
            </v-btn>
            <v-btn
              class="ml-10"
              icon
              x-small
              color="white"
              @click="mediaPlayerClickVolume"
            >
              <v-icon>
                mdi-volume-high
              </v-icon>
            </v-btn>
          </v-col>
          <v-col
            cols="12"
            class="pt-0"
          >
            <v-slider
              color="white"
              hide-details
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Player",
  data: () => ({
    btnPlay: true,
  }),
  methods: {
    mediaPlayerClickPrevious: function() {
      //
    },
    mediaPlayerClickPlay: function() {
      this.btnPlay = !this.btnPlay;
    },
    mediaPlayerClickNext: function() {
      //
    },
    mediaPlayerClickLoop: function() {
      //
    },
    mediaPlayerClickVolume: function() {
      //
    },
  }
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
</style>
