<template>
  <Sheet title="Songs">
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
          cols="8"
          class="pb-0"
        >
          <p class="font-weight-light">
            List of mp3 files originally converted from internet videos.
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
        <v-col
          cols="12"
          class="mb-8"
        >
          <v-card>
            <v-card-title>
              <v-text-field
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
              :search="search"
              class="elevation-1"
            >
              <template v-slot:item.actions="{ item }">
                <v-icon
                  small
                  class="mr-2"
                  @click="updateItem(item)"
                >
                  mdi-update
                </v-icon>
                <v-icon
                  small
                  class="mr-2"
                  @click="downloadItem(item)"
                >
                  mdi-download
                </v-icon>
                <v-icon
                  small
                  @click="deleteItem(item)"
                >
                  mdi-delete
                </v-icon>
              </template>
            </v-data-table>
          </v-card>
        </v-col>

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
import EditTitle from "@/views/apps/YouTubeDl/EditTitle.vue";
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
      inputFormat: '',
      cmbArtists: '3 - All Artists',
      cmbFeaturings: '3 - Few Feat. Artists',
      cmbFeaturingStyle: '1 - ft.',
      cmbOrientation: '2 - Title/Artists',
    }),
    methods: {
      loadTableData: function() {
        this.table.isLoading = true;
        // TODO pagination
        Axios.get(this.Globals.API_URL__YTDL_CONVERTER + '/info/tracks')
          .then(response => {
            this.$store.commit("setApisAppsYoutubedlSongsData", response.data.data.tracks);
            this.table.data = this.mapIntoTableData(response.data.data.tracks);
            this.table.isLoading = false;
          })
          .catch(error => {
            this.$store.commit("setApisAppsYoutubedlSongsData", []);
            this.table.isLoading = false;
            console.log(error);
          });
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

      }
    },
    computed: {
        ...mapGetters({
            getTableData: "getApisAppsYoutubedlSongsData"
        })
    },
    mounted: function() {
        this.loadTableData();
        this.updateNameFormattingField();
    }
});
</script>
