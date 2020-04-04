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
            A tool to download, convert and manage YouTube&#8482; videos.
          </p>
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

export default Vue.extend({
  name: "YouTubeDL",
  components: { DirectLinkExtractor },
  data: () => ({}),
  methods: {},
  computed: {},
});
</script>
