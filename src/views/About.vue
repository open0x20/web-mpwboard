<template>
  <div class="about">
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12">
          <h2 class="title">About</h2>
          <p class="font-weight-light">Hier steht alles zur aktuellen Version.</p>
        </v-col>
        <v-col cols="12">
          <Sheet title="Details">
            <Sheet title="Hallo2">
              <Sheet title="Hallo3">
                OK!
              </Sheet>
            </Sheet>
          </Sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Sheet from "@/components/Sheet.vue";

  export default Vue.extend({
    name: "About",
    components: {Sheet}
  });
</script>
