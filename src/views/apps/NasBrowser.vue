<template>
  <div class="nas-browser">
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12">
          <h2 class="title">NAS-Browser</h2>
          <p class="font-weight-light">
            The beloved, web-based, (kinda) slow but multifunctional file
            browser, used by a lot of IT savvy people. <br />
            <i>
              Hint: Use the arrows to navigate back and forth in case you opened
              a file for display.
            </i>
          </p>
        </v-col>
        <v-col cols="12">
          <v-btn small @click="iFrameBack">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-btn class="ma-2" small @click="iFrameForward">
            <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
          <iframe
            id="nasBrowserIFrame"
            :src="iFrameSrc"
            sandbox=""
            width="100%"
            height="750em"
            style="background: black"
          ></iframe>
        </v-col>
        <v-col cols="12">
          <Sheet title="Additional information">
            <v-container>
              <v-text-field
                label="URL"
                value="http://localhost:80/"
                disabled
              ></v-text-field>
            </v-container>
          </Sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Vue from "vue";
import Sheet from "@/components/Sheet.vue";

export default Vue.extend({
  name: "NasBrowser",
  components: { Sheet },
  data: () => ({
    iFrameSrc: "http://localhost:80/index.php"
  }),
  methods: {
    iFrameBack: () => {
      //document.getElementById("nasBrowserIFrame").contentWindow.history.back();
      // This might throw an error in case the iframe src is not on the same domain+port (origin)
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
