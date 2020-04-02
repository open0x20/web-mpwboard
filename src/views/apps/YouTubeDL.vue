<template>
  <div class="ytdl">
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12">
          <h2 class="title">YouTube-Downloader</h2>
          <p class="font-weight-light">
            A tool to download, convert and manage YouTube&#8482; videos.
          </p>
        </v-col>
        <v-col cols="12">
          <Sheet title="Direct Link Extractor">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <p class="font-weight-light">
                    Paste a YouTube link and click on extract!
                  </p>
                  <v-row>
                    <v-col cols="8">
                      <v-text-field
                        solo
                        label="Video-URL"
                        hint="https://youtube.com/watch?v=dQw4w9WgXcQ...."
                        v-model="directLinkExtractor.input"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4" align-self="baseline">
                      <v-btn
                        large
                        @click="directLinkExtractorOnClickExtract"
                        >Extract</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12">
                  <template>
                    <v-data-table
                      :headers="directLinkExtractor.table.headers"
                      :items="getDirectLinkTableData"
                      :sort-by="['itag']"
                      :sort-desc="[false]"
                      hide-default-footer
                      :items-per-page="100"
                      :loading="directLinkExtractor.table.isLoading"
                      class="elevation-1"
                    >
                      <template v-slot:item.url="{ item }">
                        <a :href="item.url" target="_blank">
                          {{
                            item.url.substr(0, 40) +
                              "..." +
                              item.url.substr(-10)
                          }}</a
                        >
                      </template>
                    </v-data-table>
                  </template>
                </v-col>
              </v-row>
            </v-container>
          </Sheet>
        </v-col>
        <v-col cols="12">
          <Sheet title="Additional information">
            <v-container>
              <v-text-field
                label="Direct Link URL"
                :value="directLinkExtractor.api"
                disabled
              ></v-text-field>
            </v-container>
          </Sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Vue from "vue";
import Axios from "axios";
import Sheet from "@/components/Sheet.vue";
import { mapState } from "vuex";

export default Vue.extend({
  name: "YouTubeDL",
  components: { Sheet },
  data: () => ({
    directLinkExtractor: {
      api: "http://localhost:3000/public/video_info.php",
      input: "",
      table: {
        isLoading: false,
        headers: [
          {
            text: "iTag",
            align: "start",
            sortable: true,
            value: "itag"
          },
          { text: "Format", value: "format" },
          { text: "Url", value: "url" }
        ]
      }
    }
  }),
  methods: {
    directLinkExtractorOnClickExtract: function() {
      this.directLinkExtractor.table.isLoading = true;
      this.$store.state.views.youtubedl.directLinkInputValue = this.directLinkExtractor.input;
      Axios.get(
        this.directLinkExtractor.api +
          "?url=" +
          encodeURI(this.directLinkExtractor.input)
      )
        .then(response => {
          this.$store.state.apis.apps.youtubedl.directLinkData =
            response.data.links;
          this.directLinkExtractor.table.isLoading = false;
        })
        .catch(error => {
          this.$store.state.apis.apps.youtubedl.directLinkData = [];
          this.directLinkExtractor.table.isLoading = false;
          console.log(error);
        });
    }
  },
  computed: mapState({
    getDirectLinkTableData: state => state.apis.apps.youtubedl.directLinkData,
    getDirectLinkInputValue: state => state.views.youtubedl.directLinkInputValue
  }),
  mounted() {
    this.directLinkExtractor.input = this.$store.state.views.youtubedl.directLinkInputValue;
  }
});
</script>
