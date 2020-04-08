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
              <v-img
                src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fstatic.boredpanda.com%2Fblog%2Fwp-content%2Fuploads%2F2014%2F10%2Fthe-bigger-picture-famous-album-cover-art-aptitude-6.jpg&f=1&nofb=1"
                min-height="150"
                max-height="150"
                min-width="150"
                max-width="150"
                class="border-radius-4 lightgray-background"
              />
              <v-col
                cols="12"
                class="pa-0 pb-4"
              />
              <v-divider />
              <v-col
                cols="12"
                class="pb-0 pt-0"
              >
                <v-text-field
                  clearable
                  label="Video-URL"
                  :persistent-hint="true"
                  v-model="inputVideoUrl"
                />
              </v-col>
              <v-col
                cols="12"
                class="pt-0 pb-0"
              >
                <v-text-field
                  clearable
                  label="Cover-URL"
                  :persistent-hint="true"
                  v-model="inputCoverUrl"
                />
              </v-col>
              <v-row
                class="px-3"
                align="center"
                justify="end"
              >
                <v-col cols="6">
                  <v-btn block>
                    Check Cover
                  </v-btn>
                </v-col>
                <v-col cols="6">
                  <v-btn block>
                    Auto Fill
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
                cols="6"
                class="pt-0 pb-0"
              >
                <v-text-field label="Titel" />
              </v-col>
              <v-col
                cols="6"
                class="pt-0 pb-0"
              >
                <v-text-field label="Artist" />
              </v-col>
              <v-col
                cols="6"
                class="pt-0 pb-0"
              >
                <v-text-field label="Album" />
              </v-col>
              <v-col
                cols="6"
                class="pt-0 pb-0"
              >
                <v-text-field label="Featuring" />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary darken-1"
            text
            block
            x-large
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

export default Vue.extend({
    name: "AddLink",
    components: {},
    data: () => ({
      btnAdd: {
        isLoading: false
      }
    }),
    methods: {
      add: function() {
        this.btnAdd.isLoading = true;
      }
    },
    computed: {},
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
