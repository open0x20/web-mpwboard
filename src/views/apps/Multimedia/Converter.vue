<template>
  <Sheet title="Converter">
    <v-dialog
      v-model="dialog"
      max-width="600px"
    >
      <EditTitle :active-item="activeItem" />
    </v-dialog>
    <v-container>
      <v-row
        align="center"
        justify="start"
      >
        <v-col
          cols="12"
          class="pb-0"
        >
          <p class="font-weight-light">
            A tool for video to mp3 conversion.
          </p>
        </v-col>
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
                          @click="dialog = true"
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
                          :disabled="btnRefreshDisabled"
                          @click="clickRefresh"
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
                v-model="search"
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
              :search="search"
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
                  @click="updateItem(item)"
                  :disabled="item.modified"
                >
                  mdi-update
                </v-icon>
                <v-icon
                  small
                  class="mr-2"
                  @click="downloadItem(item)"
                  :disabled="item.modified"
                >
                  mdi-download
                </v-icon>
                <v-icon
                  small
                  class="mr-2"
                  @click="deleteItem(item)"
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
                    v-model="cmbArtists"
                    :items="['1 - One Artist','2 - Few Artists','3 - All Artists']"
                    @change="updateNameFormattingField"
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
                    v-model="cmbFeaturings"
                    :items="['1 - None','2 - One Feat. Artist','3 - Few Feat. Artists','4 - All Feat. Artists']"
                    @change="updateNameFormattingField"
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
                    v-model="cmbFeaturingStyle"
                    :items="['1 - ft.','2 - feat.']"
                    @change="updateNameFormattingField"
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
                    v-model="cmbOrientation"
                    :items="['1 - Artists/Title', '2 - Title/Artists']"
                    @change="updateNameFormattingField"
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
                    v-model="inputFormat"
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

        <v-col
          cols="12"
          class="pb-0"
        >
          <v-card>
            <v-card-title
              class="font-weight-medium"
            >
              Media Player
            </v-card-title>
            <v-divider />
            <v-container class="player-background pt-0 pb-0">
              <v-row
                justify="space-between"
                align="stretch"
              >
                <!-- Media Player - Metadata --->
                <v-col cols="12" md="4" lg="4" xl="4">
                  <v-row no-gutters justify="center">
                    <v-col cols="auto" class="mr-2">
                      <v-img
                              src="https://i1.sndcdn.com/artworks-000062402673-f2f2f7-t500x500.jpg"
                              min-height="75"
                              max-height="75"
                              min-width="75"
                              max-width="75"
                              class="border-radius-4 player-img-holder"
                      />
                    </v-col>
                    <v-col>
                      <p class="font-weight-regular white--text ma-0">
                        Electricity
                      </p>
                      <p class="font-weight-light caption white--text ma-0">
                        Silk City, Dua Lipa ft. Diplo, Mark Ronson
                      </p>
                    </v-col>
                  </v-row>
                </v-col>
                <!-- Media Player - Main Controls --->
                <v-col cols="12" md="8" lg="8" xl="8">
                  <v-row
                    no-gutters
                  >
                    <v-col
                      cols="12"
                      align="center"
                      class="pt-2"
                    >
                      <v-icon
                              class="pr-10"
                              color="white"
                              small
                              @click="mediaPlayerClickLoop"
                      >
                        mdi-shuffle-variant
                      </v-icon>
                      <v-icon
                        class="pr-2"
                        color="white"
                        large
                        @click="mediaPlayerClickPrevious"
                      >
                        mdi-skip-backward
                      </v-icon>
                      <v-icon
                        class="pr-2"
                        color="white"
                        large
                        @click="mediaPlayerClickPlay"
                      >
                        {{ this.mediaPlayerBtnPlayIcon ? 'mdi-play' : 'mdi-pause' }}
                      </v-icon>
                      <v-icon
                        class="pr-10"
                        color="white"
                        large
                        @click="mediaPlayerClickNext"
                      >
                        mdi-skip-forward
                      </v-icon>
                      <v-icon
                              color="white"
                              small
                              @click="mediaPlayerClickVolume"
                      >
                        mdi-volume-high
                      </v-icon>
                    </v-col>
                    <v-col
                      cols="12"
                      class="pt-2"
                    >
                      <v-slider
                        color="white"
                        hide-details
                      />
                    </v-col>
                  </v-row>
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

export default Vue.extend({
    name: "Songs",
    components: { Sheet, EditTitle },
    data: () => ({
      Globals: Globals,
      dialog: false,
      activeItem: {},
      search: "",
      table: {
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
      btnRefreshDisabled: false,
      inputFormat: '',
      cmbArtists: '3 - All Artists',
      cmbFeaturings: '3 - Few Feat. Artists',
      cmbFeaturingStyle: '1 - ft.',
      cmbOrientation: '2 - Title/Artists',
      mediaPlayerBtnPlayIcon: true
    }),
    methods: {
      loadTableData: function() {
        this.table.isLoading = true;
        // TODO pagination
        Axios.get(this.Globals.API_URL__YTDL_CONVERTER + '/info/tracks')
          .then(response => {
            // TODO only update if data is different from before
            const newTableData = this.mapIntoTableData(response.data.data.tracks);
            if (JSON.stringify(this.getTableData) !== JSON.stringify(newTableData)) {
              this.$store.commit("setApisAppsYoutubedlSongsData", response.data.data.tracks);
              this.table.data = newTableData;
            }
            this.table.isLoading = false;
          })
          .catch(error => {
            this.$store.commit("setApisAppsYoutubedlSongsData", []);
            this.table.isLoading = false;
            console.log(error);
          });
      },
      clickRefresh: function() {
        this.table.isLoading = true;
        this.btnRefreshDisabled = true;
        setTimeout(() => {
          this.loadTableData();
          this.btnRefreshDisabled = false;
        },1500)
      },
      mapIntoTableData: function(data) {
        const finalTableData = [];
        for (let i = 0; i < data.length; i++) {
          finalTableData.push({
            ...data[i],
            artistsStr: data[i].artists.join(", "),
            featArtistsStr: data[i].featuring.join(", "),
          });
        }
        return finalTableData;
      },
      updateItem: function(item) {
        console.log("Updating item " + item.trackId);
        this.activeItem = item;
        this.dialog = true;
      },
      downloadItem: function(item) {
        const title = this.getFormattedTitleByMetadata(item.artists, item.featuring, item.title);
        console.log("Downloading item " + item.trackId + " with title: " + title);
        window.open(this.Globals.API_URL__YTDL_CONVERTER + "/stream/" + item.trackId + "?name=" + encodeURIComponent(title));
      },
      deleteItem: function(item) {
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
      getNameFormattingOptions: function() {
        return [
          this.cmbArtists[0][0],
          this.cmbFeaturings[0][0],
          this.cmbFeaturingStyle[0][0],
          this.cmbOrientation[0][0]
        ];
      },
      getFormattedTitleByMetadata: function(artists, featuringArtists, title) {
        const options = this.getNameFormattingOptions();

        // Artists
        let artistsStr = artists[0];
        if (options[0] === '2') {
          const length = (artists.length < 3) ? artists.length : 3;
          const artistsSlice = artists.slice(0, length);
          artistsStr = artistsSlice.join(', ');
        } else if (options[0] === '3') {
          artistsStr = artists.join(', ');
        }

        // Featuring Artists
        let featuringArtistsStr = '';
        if (options[1] === '2') {
          featuringArtistsStr = featuringArtists[0];
        } else if (options[1] === '3') {
          const length = (featuringArtists.length < 3) ? featuringArtists.length : 3;
          const artistsSlice = featuringArtists.slice(0, length);
          featuringArtistsStr = artistsSlice.join(', ');
        } else if (options[1] === '4') {
          featuringArtistsStr = featuringArtists.join(', ');
        }

        if (featuringArtists.length > 0 && options[1] !== '1') {
          if (options[2] === '1') {
            featuringArtistsStr = ' ft. ' + featuringArtistsStr;
          } else {
            featuringArtistsStr = ' feat. ' + featuringArtistsStr;
          }
        } else {
          featuringArtistsStr = '';
        }

        // Orientation
        if (options[3] === '1') {
          return artistsStr + featuringArtistsStr + ' - ' + title;
        } else {
          return title + ' - ' + artistsStr + featuringArtistsStr;
        }
      },
      updateNameFormattingField: function() {
        this.inputFormat = this.getFormattedTitleByMetadata(
                ['Silk City', 'Dua Lipa'],
                ['Diplo', 'Mark Ronson'],
                'Electricity',
        );

      },
      mediaPlayerClickPrevious: function() {
        //
      },
      mediaPlayerClickPlay: function() {
        this.mediaPlayerBtnPlayIcon = !this.mediaPlayerBtnPlayIcon;
      },
      mediaPlayerClickNext: function() {
        //
      },
      mediaPlayerClickLoop: function() {
        //
      },
      mediaPlayerClickVolume: function() {
        //
      },
    },
    computed: {
        ...mapGetters({
            getTableData: "getApisAppsYoutubedlSongsData"
        })
    },
    mounted: function() {
        this.loadTableData();
        this.updateNameFormattingField();

        setInterval(() => {
          this.loadTableData();
        }, 60000)
    }
});
</script>

<style>
  .player-background {
    background: #ff8000;;
  }
  .player-img-holder {
    background-color: white;
  }
</style>
