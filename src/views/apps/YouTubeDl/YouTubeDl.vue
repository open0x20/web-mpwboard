<template>
  <div class="ytdl">
    <v-container>
      <v-row
        align="center"
        justify="center"
      >
        <v-col cols="12">
          <h2 class="title">
            YouTube-Downloader
          </h2>
          <p class="font-weight-light">
            A tool to download, convert and manage internet videos.
          </p>
        </v-col>
        <v-col cols="12">
          <Songs />
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
import DirectLinkExtractor from "@/views/apps/YouTubeDl/DirectLinkExtractor";
import Songs from "@/views/apps/YouTubeDl/Songs";
import Axios from "axios";
import Globals from "@/globals";

export default Vue.extend({
  name: "YouTubeDL",
  components: { DirectLinkExtractor, Songs },
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
