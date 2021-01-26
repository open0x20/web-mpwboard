<template>
  <v-container>
    <v-row justify="center">
      <v-card>
        <v-card-title>
          <span class="headline">Add New Record</span>
        </v-card-title>
        <v-divider />
        <v-card-text>
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
                  v-model="inputName"
                  clearable
                  label="Name"
                  :persistent-hint="true"
                />
              </v-col>
              <v-col
                cols="12"
                class="pt-0 pb-0"
              >
                <v-text-field
                  v-model="inputIp"
                  clearable
                  label="IPv4"
                  :persistent-hint="true"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary darken-1"
            text
            @click="onClickReset"
          >
            Reset
          </v-btn>
          <v-btn
            color="primary darken-1"
            text
            :loading="btnAdd.isLoading"
            @click="onClickAdd"
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
import Axios from "axios";
import {mapGetters} from "vuex";

export default Vue.extend({
  name: "AddRecordDialog",
  components: {},
  props: {
    endpoint: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    inputName: '',
    inputIp: '',
    inputSecret: '',
    btnAdd: {
      isLoading: false
    }
  }),
  methods: {
    onClickAdd: function() {
      this.btnAdd.isLoading = true;
      Axios.put(
          this.endpoint + '/add',
          JSON.stringify({name:this.inputName,ip:this.inputIp,secret:this.getSessionSecret}),
          {headers: {'Content-Type': 'application/json'}}
      )
      .then(() => {
        alert('Added sucessfully!');
      })
      .catch(error => {
        alert('Oops. Something went wrong! Error written to console.')
        console.log(error);
      })
      .finally(() => {
        this.btnAdd.isLoading = false;
      });
    },
    onClickReset: function() {
      this.inputName = '';
      this.inputIp = '';
    }
  },
  computed: {
    ...mapGetters({
      getSessionSecret: "getApisAppsDnsmasqDynconfSessionSecret",
    })
  },
});
</script>

<style scoped>

</style>
