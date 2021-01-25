<template>
  <v-container class="pt-0 pb-0">
    <v-row justify="center">
      <v-card>
        <v-card-title>
          <span class="headline">Authorization</span>
        </v-card-title>
        <v-divider />
        <v-card-text class="pb-0">
          <v-container class="pb-0 pt-4">
            <v-row
              align="center"
              justify="center"
            >
              <p class="pb-0 mb-0">
                Please provide a session secret for:
              </p>
              <p>
                <b>
                  {{ this.endpoint }}
                </b>
              </p>
            </v-row>
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
                class="pt-0 pb-0"
              >
                <form id="web-mpwboard-apps-dnsmasq-dynconf-secret">
                  <v-text-field
                    v-model="inputSecret"
                    type="password"
                    clearable
                    label="Secret"
                    :persistent-hint="true"
                    :error="inputSecretIsError"
                    @change="onChangeInputSecret"
                  />
                </form>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
              color="primary darken-1"
              text
              @click="forgetSecret"
          >
            Forget
          </v-btn>
          <v-btn
            color="primary darken-1"
            text
            :loading="btnAuthorize.isLoading"
            @click="onClickAuthorize"
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

export default Vue.extend({
  name: "AuthorizationDialog",
  components: {},
  props: {
    endpoint: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    btnAuthorize: {
      isLoading: false
    },
    inputSecret: '',
    inputSecretIsError: false
  }),
  methods: {
    onClickAuthorize: function() {
      // Small validation
      if (this.inputSecret === "") {
        this.inputSecretIsError = true;
        return;
      }

      this.$store.commit("setApisAppsDnsmasqDynconfSessionSecret", this.inputSecret);
      this.inputSecretIsError = false;
      this.close();
    },
    onChangeInputSecret: function() {
      this.inputSecretIsError = false;
    },
    forgetSecret: function() {
      this.$store.commit("setApisAppsDnsmasqDynconfSessionSecret", "");
      this.inputSecret = "";
      this.inputSecretIsError = false;
    }
  },
  mounted() {
    if (this.getSessionSecret !== "") {
      this.inputSecret = this.getSessionSecret;
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
