<template>
  <div class="about">
    <v-container>
      <v-row
        align="center"
        justify="center"
      >
        <v-col cols="12">
          <h2 class="title">
            About
          </h2>
          <p class="font-weight-light">
            Hier steht alles zur aktuellen Version.
          </p>
        </v-col>
        <v-col cols="12">
          <v-col cols="12">
            <Sheet title="Additional Information">
              <v-container>
                <p class="font-weight-light">
                  YouTubeDl / Direct Link
                </p>
                <v-text-field
                  label="API Endpoint"
                  :value="Globals.API_URL__YTDL_DIRECT_LINK_EXTRACTOR"
                  disabled
                />
                <v-text-field
                  label="Project Source"
                  value="https://github.com/Athlon1600/youtube-downloader"
                  disabled
                />
                <p class="font-weight-light">
                  NAS-Browser
                </p>
                <v-text-field
                  label="API Endpoint"
                  :value="Globals.API_URL__NAS_BROWSER"
                  disabled
                />
                <v-text-field
                  label="Project Source"
                  value="https://gitlab.com/0x6861636b657220/web-nas-browser"
                  disabled
                />
              </v-container>
            </Sheet>
          </v-col>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Sheet from "@/components/Sheet.vue";
  import Globals from "@/globals";

  export default Vue.extend({
    name: "About",
    components: {Sheet},
    data: () => ({
      Globals: Globals
    })
  });
</script>
