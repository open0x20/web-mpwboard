<template>
  <v-container class="pt-0 pb-0">
    <v-row justify="center">
      <v-card>
        <v-card-title>
          <span class="headline">Add New Title</span>
        </v-card-title>
        <v-divider />
        <v-card-text class="pb-0">
          <v-container class="pb-0 pt-0">
            <v-row
              align="center"
              justify="center"
            >
              <v-col
                cols="12"
                class="pa-0 pb-0"
              />
              <v-divider />
              <v-col
                cols="12"
                class="pb-0 pt-0"
              >
                <v-text-field
                  v-model="inputVideoUrl"
                  clearable
                  label="Video-URL"
                  :persistent-hint="true"
                  :loading="inputVideoIsLoading"
                  :disabled="inputVideoIsDisabled"
                  :success="inputVideoIsSuccess"
                  :error="inputVideoIsError"
                  @change="clearAutoFill"
                  @keypress="onEnterKeyInputVideoUrl"
                />
              </v-col>
              <v-col
                cols="12"
                class="pt-0 pb-0"
              >
                <v-text-field
                  v-model="inputCoverUrl"
                  clearable
                  label="Cover-URL"
                  :persistent-hint="true"
                  :loading="inputCoverIsLoading"
                  :disabled="inputCoverIsDisabled"
                  :success="inputCoverIsSuccess"
                  :error="inputCoverIsError"
                  @input="clearCheckCover"
                  @keypress="onEnterKeyInputCoverUrl"
                />
              </v-col>
              <v-row
                class="px-3"
                align="center"
                justify="center"
              >
                <v-col cols="6">
                  <v-row
                    align="center"
                    justify="center"
                  >
                    <v-img
                      :src="imgUrl"
                      min-height="140"
                      max-height="140"
                      min-width="140"
                      max-width="140"
                      class="border-radius-4 lightgray-background"
                    />
                  </v-row>
                </v-col>
                <v-col cols="6">
                  <v-btn
                    block
                    class="mb-4"
                    @click="clickBtnAutoFill"
                  >
                    Auto Fill
                  </v-btn>
                  <v-btn
                    block
                    class="mb-4"
                    @click="clickBtnFindCover"
                  >
                    Find Cover
                  </v-btn>
                  <v-btn
                    block
                    class="mb-0"
                    @click="clickBtnCheckCover"
                  >
                    Check Cover
                  </v-btn>
                </v-col>
              </v-row>
              <v-col
                cols="12"
                class="pt-6 pb-0"
              >
                <p class="font-weight-bold pt-0 pb-0">
                  Metadata
                </p>
              </v-col>
              <v-col
                cols="12"
                class="pt-0 pb-0"
              >
                <v-text-field
                  v-model="inputTitle"
                  label="Title"
                  persistent-hint
                  :hint="inputTitleHint"
                />
              </v-col>
              <v-col
                cols="12"
                class="pt-0 pb-0"
              >
                <v-text-field
                  v-model="inputAlbum"
                  label="Album"
                />
              </v-col>

              <v-col
                cols="12"
                class="pt-0 pb-0"
              >
                <v-autocomplete
                  v-model="artistsSelection"
                  :items="artistsData"
                  :search-input.sync="artistsSearchInput"
                  chips
                  label="Artist(s)"
                  item-text="name"
                  item-value="name"
                  multiple
                  @keypress="addArtist"
                  @change="clearArtistsSearchInput"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      v-bind="data.attrs"
                      :input-value="data.selected"
                      close
                      :color="artistsSelection.indexOf(data.item) === 0 ? 'primary' : 'Gray'"
                      @click="data.select"
                      @click:close="removeArtistsSelectionItem(data.item)"
                    >
                      {{ data.item }}
                    </v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template>
                      <v-list-item-content v-text="data.item" />
                    </template>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col
                cols="12"
                class="pt-0 pb-0"
              >
                <v-autocomplete
                  v-model="featuringArtistsSelection"
                  :items="artistsData"
                  :search-input.sync="featuringArtistsSearchInput"
                  chips
                  label="Featuring Artist(s)"
                  item-text="name"
                  item-value="name"
                  multiple
                  @keypress="addFeaturingArtist"
                  @change="clearFeaturingArtistsSearchInput"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      v-bind="data.attrs"
                      :input-value="data.selected"
                      close
                      color="Gray"
                      @click="data.select"
                      @click:close="removeFeaturingArtistsSelectionItem(data.item)"
                    >
                      {{ data.item }}
                    </v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template>
                      <v-list-item-content v-text="data.item" />
                    </template>
                  </template>
                </v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary darken-1"
            text
            @click="reset(true)"
          >
            Reset
          </v-btn>
          <v-btn
            color="primary darken-1"
            text
            :loading="btnAdd.isLoading"
            @click="add"
          >
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import Vue from "vue";
import {mapGetters} from "vuex";
import Axios from "axios";
import globals from "@/globals";
import TitleHelper from "@/helper";

export default Vue.extend({
    name: "AddLink",
    components: {},
    props: ['activeItem'],
    data: () => ({
      Globals: globals,
      snackbar: true,
      artistsData: [],
      artistsSelection: [],
      artistsSearchInput: "",
      featuringArtistsSelection: [],
      featuringArtistsSearchInput: "",
      inputVideoUrl: "",
      inputVideoIsLoading: false,
      inputVideoIsDisabled: false,
      inputVideoIsSuccess: false,
      inputVideoIsError: false,
      inputCoverUrl: "",
      inputCoverIsLoading: false,
      inputCoverIsDisabled: false,
      inputCoverIsSuccess: false,
      inputCoverIsError: false,
      inputTitle: "",
      inputTitleHint: "",
      inputAlbum: "",
      imgUrl: "",
      originalTitle: "",
      btnAdd: {
        isLoading: false
      }
    }),
    methods: {
      removeArtistsSelectionItem (item) {
        const index = this.artistsSelection.indexOf(item)
        if (index >= 0) this.artistsSelection.splice(index, 1)
      },
      removeFeaturingArtistsSelectionItem (item) {
        const index = this.featuringArtistsSelection.indexOf(item)
        if (index >= 0) this.featuringArtistsSelection.splice(index, 1)
      },
      clickBtnAutoFill: function() {
        this.inputVideoIsLoading = true;
        this.inputVideoIsDisabled = true;
        Axios.get(
                this.Globals.API_URL__YTDL_CONVERTER +
                "/info/check_ytv" +
                "?url=" +
                encodeURI(this.inputVideoUrl)
        )
                .then(response => {
                  this.inputVideoIsLoading = false;
                  this.inputVideoIsDisabled = false;
                  if (response.data.data !== null) {
                    this.reset();
                    this.inputVideoIsSuccess = true;
                    const title = TitleHelper.fetchTitle(response.data.data);
                    this.originalTitle = title;
                    this.inputTitleHint = "Original Title: " + title;
                    this.extractYtvTitleInformationIntoInputs(title);
                  } else {
                    this.inputVideoIsError = true;
                  }
                })
                .catch(error => {
                  this.inputVideoIsLoading = false;
                  this.inputVideoIsDisabled = false;
                  this.inputVideoIsError = true;
                  console.log(error);
                });
      },
      clickBtnCheckCover: function() {
        this.inputCoverIsLoading = true;
        this.inputCoverIsDisabled = true;
        Axios.get(
                this.Globals.API_URL__YTDL_CONVERTER +
                "/info/check_cover" +
                "?url=" +
                encodeURI(this.inputCoverUrl)
        )
                .then(response => {
                  this.inputCoverIsLoading = false;
                  this.inputCoverIsDisabled = false;
                  if (response.data.data !== null) {
                    this.inputCoverIsSuccess = true;
                    this.imgUrl = this.inputCoverUrl;
                  } else {
                    this.inputCoverIsError = true;
                    this.imgUrl = "";
                  }
                })
                .catch(error => {
                  this.inputCoverIsLoading = false;
                  this.inputCoverIsDisabled = false;
                  this.inputCoverIsError = true;
                  console.log(error);
                });
      },
      clickBtnFindCover: function() {
        // Prepare title for searchInput
        let title = TitleHelper.removeUnregularTitleSideCharacters(TitleHelper.removeCommonPhrasesFromTitle(this.originalTitle));
        if (title.length === 0) {
          title = this.inputTitle;
        }

        // Open image searchInput in new tab
        window.open(
          'https://duckduckgo.com/?q=' + encodeURIComponent(title) + '+album+cover&iar=images&iaf=layout%3ASquare&iax=images&ia=images',
          '_blank'
        );
      },
      clearAutoFill: function() {
        this.inputVideoIsSuccess = false;
        this.inputVideoIsError = false;
      },
      clearCheckCover: function() {
        this.inputCoverIsSuccess = false;
        this.inputCoverIsError = false;
      },
      clearArtistsSearchInput: function() {
        this.artistsSearchInput = "";
      },
      clearFeaturingArtistsSearchInput: function() {
        this.featuringArtistsSearchInput = "";
      },
      onEnterKeyInputVideoUrl: function(event) {
        if (event.key === "Enter") {
          this.clickBtnAutoFill();
        }
      },
      onEnterKeyInputCoverUrl: function(event) {
        if (event.key === "Enter") {
          this.clickBtnCheckCover();
        }
      },
      add: function() {
        // Roughly validate inputs
        // Main validation will be done by the backend anyway
        if (!this.inputVideoIsSuccess) {
          this.inputVideoIsError = true;
          return;
        }
        if (!this.inputCoverIsSuccess) {
          this.inputCoverIsError = true;
          return;
        }
        if (this.inputTitle.length < 2) {
          alert("Please put a title with a minimum length of 2 characters!");
          return;
        }
        if (this.artistsSelection.length === 0) {
          alert("Please put an artist!");
          return;
        }

        // TODO Keine UTF-8 Zeichen im Artist/FArtist

        const payload = {
          urlYtv: this.inputVideoUrl,
          artists: this.artistsSelection,
          featuring: this.featuringArtistsSelection,
          title: this.inputTitle,
          album: null,
          urlCover: this.inputCoverUrl,
        };

        if (this.inputAlbum.length > 0) {
          payload.album = this.inputAlbum;
        }

        console.log(payload);

        this.btnAdd.isLoading = true;
        Axios.post(this.Globals.API_URL__YTDL_CONVERTER + "/add", payload)
                .then(response => {
                  alert("OK");
                  this.btnAdd.isLoading = false;
                })
                .catch(error => {
                  console.log(error);
                  this.btnAdd.isLoading = false;
                });
      },
      addArtist: function(event) {
        if (event.key === "Enter") {
          if (event.target.value.length > 1) {
            this.artistsData.push(event.target.value);
            this.artistsSelection.push(event.target.value);
            this.artistsSearchInput = "";
            this.updateInputTitle();
          }
        }
      },
      addFeaturingArtist: function(event) {
        if (event.key === "Enter") {
          if (event.target.value.length > 1) {
            this.artistsData.push(event.target.value);
            this.featuringArtistsSelection.push(event.target.value);
            this.featuringArtistsSearchInput = "";
            this.updateInputTitle();
          }
        }
      },
      updateInputTitle: function() {
        let newTitle = this.inputTitle;
        newTitle = TitleHelper.removeArtistsFromTitle(newTitle, this.artistsData);
        newTitle = TitleHelper.removeUnregularTitleSideCharacters(newTitle);
        this.inputTitle = newTitle;
      },
      reset: function(includingUrls = false) {
        // empty fields
        this.artistsSelection = [];
        this.featuringArtistsSelection = [];
        this.inputTitle = "";
        this.inputTitleHint = "";
        this.inputAlbum = "";

        if (includingUrls) {
          this.inputVideoUrl = "";
          this.inputCoverUrl = "";
          this.inputVideoIsSuccess = false;
          this.inputVideoIsError = false;
          this.inputCoverIsSuccess = false;
          this.inputCoverIsError = false;
          this.imgUrl = "";
        }
      },
      extractYtvTitleInformationIntoInputs: function(title) {
        const titleLower = title.toLowerCase();
        let featuringString = "";
        let artists = [];

        // Check if title contains a featuring artist
        featuringString = TitleHelper.findFeaturingString(title);

        // Extract known artists
        artists = TitleHelper.findKnowArtistsInTitle(title, this.artistsData);

        // Add artist chip to either artists-input or featuring-artists-input
        if (featuringString !== "") {
          const featuringStringPosition = titleLower.indexOf(featuringString.toLowerCase(), 0);
          for (let i = 0; i < artists.length; i++) {
            const distance = titleLower.indexOf(artists[i].toLowerCase(), 0) - (featuringStringPosition + featuringString.length);
            // Basically we check if the found artists stands to the left or to the right of the "featuring" separator
            if (distance >= 0) {
              if (this.featuringArtistsSelection.indexOf(artists[i]) === -1) {
                this.featuringArtistsSelection.push(artists[i]);
              }
            } else {
              if (this.artistsSelection.indexOf(artists[i]) === -1) {
                this.artistsSelection.push(artists[i]);
              }
            }
          }
        } else {
          for (let i = 0; i < artists.length; i++) {
            if (this.artistsSelection.indexOf(artists[i]) === -1) {
              this.artistsSelection.push(artists[i]);
            }
          }
        }

        // Filter Title
        let newTitle = TitleHelper.removeArtistsFromTitle(title, artists);
        newTitle = TitleHelper.removeFeaturingStringFromTitle(newTitle, featuringString);
        newTitle = TitleHelper.removeCommonPhrasesFromTitle(newTitle);
        newTitle = TitleHelper.removeUnregularTitleSideCharacters(newTitle);
        this.inputTitle = newTitle;

      }
    },
  mounted() {
      // Intially load all artists for autocompletion
      this.artistsData = this.getArtistsData;
  },
  computed: {
      ...mapGetters({
        getArtistsData: "getApisAppsAtacArtistsData"
      })
    },
  watch: {
      activeItem: function(newItem, oldItem) {
        this.reset(true);

        //
        if (newItem === undefined) {
          return;
        }


        // Load data into inputs
        this.inputVideoUrl = newItem.urlYtv;
        this.inputCoverUrl = newItem.urlCover;
        this.imgUrl = newItem.urlCover;
        this.inputTitle = newItem.title;
        this.inputAlbum = newItem.album;
        for (let i = 0; i < newItem.artists.length; i++) {
          this.artistsSelection.push(newItem.artists[i]);
        }
        for (let i = 0; i < newItem.featuring.length; i++) {
          this.featuringArtistsSelection.push(newItem.featuring[i]);
        }

        // Set everything as already validated
        this.inputVideoIsSuccess = true;
        this.inputCoverIsSuccess = true;
      }
  }
});
</script>

<style>
  .border-radius-4 {
    border-radius: 4px;
  }
  .lightgray-background {
    background: lightgray;
  }
</style>
