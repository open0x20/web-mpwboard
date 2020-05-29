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
            Multimedia
          </h1>
          <v-divider></v-divider>
          <p class="font-weight-light font-italic pt-2">
            A place where you can download, convert and manage multimedia content.
          </p>
        </v-col>
        <v-col cols="12">
          <Converter />
        </v-col>
        <v-col cols="12">
          <DirectLinkExtractor />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Vue from "vue";
import DirectLinkExtractor from "@/views/apps/Multimedia/DirectLinkExtractor";
import Converter from "@/views/apps/Multimedia/Converter";
import Axios from "axios";
import Globals from "@/globals";

export default Vue.extend({
  name: "Multimedia",
  components: { DirectLinkExtractor, Converter },
  data: () => ({
    Globals: Globals
  }),
  methods: {
    loadArtistsData: function() {
      Axios.get(this.Globals.API_URL__YTDL_CONVERTER + '/info/artists')
        .then(response => {
          this.$store.commit("setApisAppsYoutubedlArtistsData", response.data.data.artists);
        })
        .catch(error => {
          this.$store.commit("setApisAppsYoutubedlArtistsData", []);
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
