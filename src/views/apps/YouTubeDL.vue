<template>
  <div class="ytdl">
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12">
          <h2 class="title">YouTube-Downloader</h2>
          <p class="font-weight-light">A tool to download, convert and manage YouTube&#8482; videos.</p>
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
                        hint="Example: https://youtube.com/watch?v=dQw4w9WgXcQ"
                        v-model="inputDirectLinks"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-btn class="" large @click="clickOnExtract"
                        >Extract</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12">
                  <template>
                    <v-data-table
                      :headers="tableDirectLinks.tableHeaders"
                      :items="getTableDirectLinksData"
                      :sort-by="['itag']"
                      :sort-desc="[false]"
                      hide-default-footer
                      items-per-page="100"
                      :loading="tableDirectLinks.isLoading"
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
                value="http://localhost:3000/public/video_info.php"
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
    inputDirectLinks: "",
    tableDirectLinks: {
      isLoading: false,
      tableHeaders: [
        {
          text: "iTag",
          align: "start",
          sortable: true,
          value: "itag"
        },
        { text: "Format", value: "format" },
        { text: "Url", value: "url" }
      ],
      tableData: []
    }
  }),
  methods: {
    onInputChangedDirectLinks: function(event) {
      console.log(event.target);
      this.inputDirectLinks = event.target.value;
    },
    clickOnExtract: function() {
      this.tableDirectLinks.isLoading = true;
      Axios.get(
        "http://localhost:3000/public/video_info.php" +
          "?url=" +
          encodeURI(this.inputDirectLinks)
      )
        .then(response => {
          this.$store.state.apis.apps.youtubedl.directLinks =
            response.data.links;
          this.tableDirectLinks.isLoading = false;
        })
        .catch(error => {
          this.$store.state.apis.apps.youtubedl.directLinks = [];
          this.tableDirectLinks.isLoading = false;
          console.log(error);
        });
    }
  },
  computed: mapState({
    getTableDirectLinksData: state => state.apis.apps.youtubedl.directLinks
  })
});
</script>
