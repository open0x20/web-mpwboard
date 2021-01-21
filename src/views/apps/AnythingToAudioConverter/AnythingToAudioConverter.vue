<template>
  <div class="ytdl">
    <v-container>
      <v-row
        align="center"
        justify="center"
        class="pl-4 pr-4"
      >
        <v-col cols="12">
          <h1 class="display-1">
            Anything To Audio Converter (ATAC)
          </h1>
          <v-divider />
          <p class="font-weight-light font-italic pt-2">
            A place where you can download, convert and manage multimedia content.
          </p>
        </v-col>

        <!-- Audio Player -->
        <v-col>
          <v-card shaped>
            <Player />
          </v-card>
        </v-col>

        <!-- Converter -->
        <v-col cols="12">
          <Converter />
        </v-col>

        <!-- Direct Link Extractor -->
        <v-col cols="12">
          <DirectLinkExtractor />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Vue from "vue";
import Player from "@/components/Player.vue";
import DirectLinkExtractor from "@/views/apps/AnythingToAudioConverter/DirectLinkExtractor";
import Converter from "@/views/apps/AnythingToAudioConverter/Converter";
import Axios from "axios";
import Globals from "@/globals";

export default Vue.extend({
  name: "AnythingToAudioConverter",
  components: { DirectLinkExtractor, Converter, Player },
  data: () => ({
    Globals: Globals
  }),
  methods: {
    loadArtistsData: function() {
      Axios.get(this.Globals.API_URL__ATAC + '/info/artists')
        .then(response => {
          this.$store.commit("setApisAppsAtacArtistsData", response.data.data.artists);
        })
        .catch(error => {
          this.$store.commit("setApisAppsAtacArtistsData", []);
          console.log(error);
        });
    }
  },
  mounted() {
    this.loadArtistsData();
  },
  computed: {},
});
</script>
