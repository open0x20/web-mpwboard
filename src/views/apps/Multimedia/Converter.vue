<template>
  <Sheet title="Converter">
    <v-dialog
      v-model="table.addDialog.show"
      max-width="600px"
    >
      <EditTitle :active-item="table.addDialog.activeItem" />
    </v-dialog>
    <v-container>
      <v-row
        align="center"
        justify="start"
      >
        <!-- Sheet Description -->
        <v-col
          cols="12"
          class="pb-0"
        >
          <p class="font-weight-light">
            A tool for video to mp3 conversion.
          </p>
        </v-col>

        <!-- Table: Songs -->
        <v-col
          cols="12"
          class="mb-0"
        >
          <v-card>
            <v-card-title>
              <v-container class="pa-0 ma-0">
                <v-row no-gutters>
                  <v-col>
                    <h3 class="title">
                      Songs
                    </h3>
                  </v-col>
                  <v-col
                    cols="1"
                    align="right"
                  >
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-icon
                          v-on="on"
                          class="pr-2"
                          @click="table.addDialog.show = true"
                        >
                          mdi-plus
                        </v-icon>
                      </template>
                      <span>Add New Track</span>
                    </v-tooltip>
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-icon
                          v-on="on"
                          :disabled="table.btnRefreshDisabled"
                          @click="tableClickRefresh"
                        >
                          mdi-refresh
                        </v-icon>
                      </template>
                      <span>Refresh Track List</span>
                    </v-tooltip>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-title>
            <v-divider />
            <v-card-title class="pt-0">
              <v-text-field
                class="font-weight-regular"
                v-model="table.searchInput"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              />
            </v-card-title>
            <v-data-table
              :loading="table.isLoading"
              :headers="table.headers"
              :items="table.data"
              :sort-by="['trackId']"
              :sort-desc="[true]"
              :search="table.searchInput"
              :footer-props="{
                itemsPerPageOptions: [15,50,100,-1]
              }"
              :items-per-page="15"
              class="elevation-1"
            >
              <template v-slot:item.actions="{ item }">
                <v-icon
                  small
                  class="mr-2"
                  @click="actionBtnPlay(item)"
                  :disabled="item.modified"
                >
                  mdi-play
                </v-icon>
                <v-icon
                  small
                  class="mr-2"
                  @click="actionBtnUpdate(item)"
                  :disabled="item.modified"
                >
                  mdi-update
                </v-icon>
                <v-icon
                  small
                  class="mr-2"
                  @click="actionBtnDownload(item)"
                  :disabled="item.modified"
                >
                  mdi-download
                </v-icon>
                <v-icon
                  small
                  class="mr-2"
                  @click="actionBtnDelete(item)"
                  :disabled="item.modified"
                >
                  mdi-delete
                </v-icon>
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-icon
                      v-show="item.modified"
                      v-on="on"
                      small
                    >
                      mdi-alert-outline
                    </v-icon>
                  </template>
                  <span>Still in conversion process</span>
                </v-tooltip>
              </template>
            </v-data-table>
          </v-card>
        </v-col>

        <!-- Card: Format Settings -->
        <v-col
          cols="12"
        >
          <v-card>
            <v-card-title
              class="font-weight-medium"
            >
              Download format settings
            </v-card-title>
            <v-divider />
            <v-container>
              <v-row>
                <v-col
                  cols="3"
                  class="pt-0 mt-0"
                >
                  <v-select
                    v-model="formatter.artistsSelection"
                    :items="formatter.artists"
                    @change="onFormatterUpdate"
                    filled
                    dense
                    hide-details
                    class="pb-0 mb-0"
                  />
                </v-col>
                <v-col
                  cols="3"
                  class="pt-0 mt-0"
                >
                  <v-select
                    v-model="formatter.featuringArtistsSelection"
                    :items="formatter.featuringArtists"
                    @change="onFormatterUpdate"
                    filled
                    dense
                    hide-details
                    class="pb-0 mb-0"
                  />
                </v-col>
                <v-col
                  cols="3"
                  class="pt-0 mt-0"
                >
                  <v-select
                    v-model="formatter.featuringStyleSelection"
                    :items="formatter.featuringStyle"
                    @change="onFormatterUpdate"
                    filled
                    dense
                    hide-details
                    class="pb-0 mb-0"
                  />
                </v-col>
                <v-col
                  cols="3"
                  class="pt-0 mt-0"
                >
                  <v-select
                    v-model="formatter.orientationSelection"
                    :items="formatter.orientation"
                    @change="onFormatterUpdate"
                    filled
                    dense
                    hide-details
                    class="pb-0 mb-0"
                  />
                </v-col>
                <v-col
                  cols="12"
                  class="pt-0 mt-0"
                >
                  <v-text-field
                    v-model="formatter.text"
                    block
                    filled
                    dense
                    disabled
                    hide-details
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </Sheet>
</template>

<script>
import Vue from "vue";
import Globals from "@/globals";
import Sheet from "@/components/Sheet.vue";
import EditTitle from "@/views/apps/Multimedia/EditTitle.vue";
import {mapGetters} from "vuex";
import Axios from "axios";
import TitleHelper from "@/helper";

export default Vue.extend({
    name: "Songs",
    components: { Sheet, EditTitle },
    data: () => ({
      Globals: Globals,
      table: {
        addDialog: {
          show: false,
          activeItem: {}
        },
        btnRefreshDisabled: false,
        searchInput: "",
        isLoading: false,
        headers: [
              {text: "Id", value: "trackId"},
              {text: "Title", value: "title"},
              {text: "Artist(s)", value: "artistsStr"},
              {text: "Feat. Artist(s)", value: "featArtistsStr"},
              {text: 'Actions', value: 'actions', sortable: false },
        ],
        data: []
      },
      formatter: {
        artists: [{ text: "One Artist", value: 1 }, { text: "Few Artists", value: 2 }, { text: "All Artists", value: 3 }],
        featuringArtists: [{ text: "None", value: 1 }, { text: "One Feat. Artist", value: 2 }, { text: "Few Feat. Artists", value: 3 }, { text: "All Feat. Artists", value: 4 }],
        featuringStyle: [{ text: "ft.", value: 1 }, { text: "feat.", value: 2 }],
        orientation: [{ text: "Artists/Title", value: 1 }, { text: "Title/Artists", value: 2 }],
        artistsSelection: 3,
        featuringArtistsSelection: 3,
        featuringStyleSelection: 1,
        orientationSelection: 2,
        text: ''
      },
    }),
    methods: {
      tableFetchData: function() {
        this.table.isLoading = true;
        // TODO pagination
        Axios.get(this.Globals.API_URL__YTDL_CONVERTER + '/info/tracks')
          .then(response => {
            // Add glued artists and featuring artists strings to each track
            const mappedTableData = response.data.data.tracks.map(o => {
              return {
                ...o,
                artistsStr: o.artists.join(", "),
                featArtistsStr: o.featuring.join(", "),
              }
            });
            // Compare to previous table data, only update table fi new data is present
            if (JSON.stringify(this.getTableData) !== JSON.stringify(mappedTableData)) {
              this.$store.commit("setApisAppsYoutubedlSongsData", response.data.data.tracks);
              this.table.data = mappedTableData;
            }
            this.table.isLoading = false;
          })
          .catch(error => {
            this.$store.commit("setApisAppsYoutubedlSongsData", []);
            this.table.isLoading = false;
            console.log(error);
          });
      },
      tableClickRefresh: function() {
        this.table.isLoading = true;
        this.table.btnRefreshDisabled = true;
        setTimeout(() => {
          this.tableFetchData();
          this.table.btnRefreshDisabled = false;
        },1500)
      },
      actionBtnUpdate: function(item) {
        console.log("Updating item " + item.trackId);
        this.table.addDialog.activeItem = item;
        this.table.addDialog.show = true;
      },
      actionBtnDownload: function(item) {
        const title = TitleHelper.getFormattedTitleByMetadata(
                [this.formatter.artistsSelection,this.formatter.featuringArtistsSelection,this.formatter.featuringStyleSelection,this.formatter.orientationSelection],
                item.artists,
                item.featuring,
                item.title
        );
        console.log("Downloading item " + item.trackId + " with title: " + title);
        window.open(this.Globals.API_URL__YTDL_CONVERTER + "/stream/" + item.trackId + "?name=" + encodeURIComponent(title), "_self");
      },
      actionBtnDelete: function(item) {
        console.log("Deleting item " + item.trackId);
        confirm("Are you sure you want to delete this item? (" + item.title + ")") && Axios.post(this.Globals.API_URL__YTDL_CONVERTER + "/delete", JSON.stringify({trackId:item.trackId}))
                .then(response => {
                  if (response.data.data.trackid === item.trackId) {
                    const index = this.table.data.indexOf(item)
                    this.table.data.splice(index, 1)
                  }
                })
                .catch(error => {
                  console.log(error);
                });
      },
      actionBtnPlay: function(item) {
        if (JSON.stringify(item) === JSON.stringify(this.playerTrack)) {
          return;
        }
        console.log("Playing item " + item.trackId);
        this.$store.commit("setViewsYoutubedlPlayerTrack", item);
        this.$store.commit("setViewsYoutubedlPlayerEvent", {id: (this.playerEvent.id + 1), name: "start"});
      },
      onFormatterUpdate: function() {
        this.formatter.text = TitleHelper.getFormattedTitleByMetadata(
                [this.formatter.artistsSelection,this.formatter.featuringArtistsSelection,this.formatter.featuringStyleSelection,this.formatter.orientationSelection],
                ['Silk City', 'Dua Lipa'],
                ['Diplo', 'Mark Ronson'],
                'Electricity',
        );

      },
    },
    computed: {
        ...mapGetters({
          getTableData: "getApisAppsYoutubedlSongsData",
          playerEvent: "getViewsYoutubedlPlayerEvent",
          playerTrack: "getViewsYoutubedlPlayerTrack",
        })
    },
    mounted: function() {
        this.tableFetchData();
        this.onFormatterUpdate();

        setInterval(() => {
          this.tableFetchData();
        }, 60000)
    }
});
</script>
