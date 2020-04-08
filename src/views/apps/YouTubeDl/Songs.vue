<template>
  <Sheet title="Songs">
    <v-dialog
      v-model="dialog"
      max-width="600px"
    >
      <AddTitle />
    </v-dialog>
    <v-container>
      <v-row
        align="center"
        justify="start"
      >
        <v-col
          cols="8"
          class="pb-0"
        >
          <p class="font-weight-light">
            List of mp3 files originally converted from YouTube videos.
            Click on "Add" to queue a new video for processing.
          </p>
        </v-col>
        <v-col
          cols="12"
          align-self="end"
          class="pb-0"
        >
          <v-row
            no-gutters
            justify="end"
          >
            <v-btn @click="dialog = true">
              <v-icon
                left
              >
                mdi-plus
              </v-icon>
              Add new title
            </v-btn>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-data-table
            :loading="table.isLoading"
            :headers="table.headers"
            :items="getTableData"
            class="elevation-1"
          />
        </v-col>
      </v-row>
    </v-container>
  </Sheet>
</template>

<script>
import Vue from "vue";
import Globals from "@/globals";
import Sheet from "@/components/Sheet.vue";
import AddTitle from "@/views/apps/YouTubeDl/AddTitle.vue";
import {mapGetters} from "vuex";
import Axios from "axios";

export default Vue.extend({
    name: "Songs",
    components: { Sheet, AddTitle },
    data: () => ({
      Globals: Globals,
      dialog: false,
      table: {
          isLoading: false,
          headers: [
              {text: "Title", value: "title"},
              {text: "Artist", value: "artist"},
              {text: "Url", value: "url"}
          ]
      }
    }),
    methods: {
      loadTableData: function() {
        this.table.isLoading = true;
        Axios.get(
                this.Globals.API_URL__YTDL_SONGS
        )
                .then(response => {
                  this.$store.commit("setApisAppsYoutubedlSongsData", response.data.songs);
                  this.table.isLoading = false;
                })
                .catch(error => {
                  this.$store.commit("setApisAppsYoutubedlSongsData", []);
                  this.table.isLoading = false;
                  console.log(error);
                });
      }
    },
    computed: {
        ...mapGetters({
            getTableData: "getApisAppsYoutubedlSongsData"
        })
    },
    mounted: function() {
        this.loadTableData();
    }
});
</script>
