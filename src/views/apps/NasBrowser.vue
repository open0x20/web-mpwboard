<template>
  <div class="nas-browser">
    <v-container>
      <v-row
        align="center"
        justify="center"
      >
        <v-col cols="12">
          <h2 class="title">
            NAS-Browser
          </h2>
          <p class="font-weight-light">
            The beloved, web-based, (kinda) slow but multifunctional file
            browser, used by a lot of IT savvy people. <br>
            <i>
              Hint: Use the arrows to navigate back and forth in case you opened
              a file for display.
            </i>
          </p>
        </v-col>
        <v-col cols="12">
          <v-alert
            prominent
            type="error"
            dismissible
            v-show="showAlert"
            transition="scale-transition"
          >
            <v-row align="center">
              <v-col class="grow">
                Can't reach NAS
              </v-col>
            </v-row>
          </v-alert>
          <v-btn
            small
            @click="iFrameBack"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-btn
            class="ma-2"
            small
            @click="iFrameForward"
          >
            <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
          <iframe
            id="nasBrowserIFrame"
            :src="src"
            sandbox=""
            width="100%"
            height="750em"
            style="background: black"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Vue from "vue";
import Axios from "axios";
import Globals from "@/globals";

export default Vue.extend({
  name: "NasBrowser",
  components: {},
  data: () => ({
    Globals: Globals,
    showAlert: false,
    src: ""
  }),
  mounted: function () {
    Axios.head(this.Globals.API_URL__NAS_BROWSER)
      .then(() => {
        this.src = this.Globals.API_URL__NAS_BROWSER
      })
      .catch(() => {
        this.showAlert = true;
      })
  },
  methods: {
    iFrameBack: () => {
      // This might throw an error in case the iframe src is not on the same domain+port (origin)
      //document.getElementById("nasBrowserIFrame").contentWindow.history.back();
      // Temporary workaround TODO
      document.getElementById("nasBrowserIFrame").src = document.getElementById("nasBrowserIFrame").src;
    },
    iFrameForward: () => {
      // This might throw an error in case the iframe src is not on the same domain+port (origin)
      //document.getElementById("nasBrowserIFrame").contentWindow.history.forward();
    }
  }
});
</script>
