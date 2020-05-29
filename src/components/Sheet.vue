<template>
  <v-sheet
    elevation="6"
    class="mx-auto"
  >
    <v-sheet
      :color="color"
      class="sheet-header"
    />
    <v-container>
      <h3 class="title pa-2">
        {{ title }}
      </h3>
      <v-divider />
      <slot />
    </v-container>
  </v-sheet>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Sheet",
  props: {
    title: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "primary"
    }
  },
  data: () => ({})
});
</script>

<style>
  .sheet-header {
    border-radius: 4px 4px 0px 0px;
    min-height: 6px;
  }
</style>
