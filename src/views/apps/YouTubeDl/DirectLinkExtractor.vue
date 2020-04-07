<template>
  <div class="ytdl">
    <Sheet title="Direct Link Extractor">
      <v-container>
        <v-row>
          <v-col cols="12">
            <p class="font-weight-light">
              Paste a YouTube link and click on extract!
            </p>
            <v-row>
              <v-col
                cols="7"
                class="pa-0 px-2"
              >
                <v-text-field
                  solo
                  clearable
                  placeholder="Video-URL"
                  hint="Allowed formats: https://youtube.com/... https://youtu.be/..."
                  :persistent-hint="true"
                  v-model="input"
                />
              </v-col>
              <v-col
                cols="4"
                class="pa-0 px-2"
              >
                <v-btn
                  min-height="48"
                  @click="onClickExtract"
                >
                  Extract
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
          <v-col
            cols="12"
            class="pa-0 px-2"
          >
            <template>
              <v-data-table
                :loading="table.isLoading"
                :headers="table.headers"
                :items="getTableData"
                :sort-by="['itag']"
                :sort-desc="[false]"
                :items-per-page="100"
                hide-default-footer
                class="elevation-1"
              >
                <template v-slot:item.url="{ item }">
                  <a
                    :href="item.url"
                    target="_blank"
                  >
                    {{ item.url.substr(0, 40) + "..." + item.url.substr(-10) }}
                  </a>
                </template>
              </v-data-table>
            </template>
          </v-col>
        </v-row>
      </v-container>
    </Sheet>
  </div>
</template>

<script>
import Vue from "vue";
import Globals from "@/globals";
import Axios from "axios";
import Sheet from "@/components/Sheet.vue";
import { mapState, mapGetters } from "vuex";

export default Vue.extend({
  name: "YouTubeDL",
  components: { Sheet },
  data: () => ({
    Globals: Globals,
    input: "",
    table: {
      isLoading: false,
      headers: [
        { text: "iTag", value: "itag" },
        { text: "Format", value: "format" },
        { text: "Url", value: "url" }
      ]
    }
  }),
  methods: {
    onClickExtract: function() {
      this.table.isLoading = true;
      this.$store.commit("setViewsYoutubedlDirectLinkInputValue", this.input);
      Axios.get(
        this.Globals.API_URL__YTDL_DIRECT_LINK_EXTRACTOR +
          "?url=" +
          encodeURI(this.input)
      )
        .then(response => {
          this.$store.commit("setApisAppsYoutubedlDirectLinkData", response.data.links);
          this.table.isLoading = false;
        })
        .catch(error => {
          this.$store.commit("setApisAppsYoutubedlDirectLinkData", []);
          this.table.isLoading = false;
          console.log(error);
        });
    }
  },
  computed: {
    ...mapState({
      getTableData: state => state.apis.apps.youtubedl.directLinkData,
      getInputValue: state => state.views.youtubedl.directLinkInputValue
    }),
    ...mapGetters({
      getViewsYoutubedlDirectLinkInputValue: "getViewsYoutubedlDirectLinkInputValue"
    })
  },
  mounted() {
    this.input = this.getViewsYoutubedlDirectLinkInputValue;
  }
});
</script>
