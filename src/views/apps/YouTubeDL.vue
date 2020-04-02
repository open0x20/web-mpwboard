<template>
  <div class="ytdl">
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12">
          <h2 class="title">YouTube-Downloader</h2>
          <p class="font-weight-light">TODO</p>
        </v-col>
        <v-col cols="12">
          <Sheet title="Direct Link Extractor">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <p class="font-weight-light">
                    Paste a youtube link and click on extract!
                  </p>
                  <v-row>
                    <v-col cols="8">
                      <v-text-field solo label="Video-URL" hint="Example: https://youtube.com/watch?v=dQw4w9WgXcQ"></v-text-field>
                    </v-col>
                    <v-col cols="1">
                      <v-btn class="" large >Extract</v-btn>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12">
                  <v-data-table
                          :headers="tableDirectLinks.tableHeaders"
                          :items="tableDirectLinks.tableData"
                          :sort-by="['itag']"
                          :sort-desc="[false]"
                          multi-sort
                          hide-default-footer
                          class="elevation-1"
                  ></v-data-table>
                </v-col>
              </v-row>
            </v-container>
          </Sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Vue from "vue";
import Sheet from "@/components/Sheet.vue";

export default Vue.extend({
  name: "YouTubeDL",
  components: { Sheet },
  data: () => ({
    apiDirectLinksUrl: "http://localhost:3000/public/video_info.php?url=",
    tableDirectLinks: {
      tableHeaders: [
        {
          text: "itag",
          align: "start",
          sortable: false,
          value: "itag"
        },
        { text: "format", value: "format" },
        { text: "url", value: "url" }
      ],
      tableData: []
    },
  })
});
</script>
