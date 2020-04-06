<template>
  <v-sheet
    elevation="6"
    class="mx-auto"
  >
    <v-sheet
      color="primary"
      min-height="3"
    />
    <v-container>
      <h3 class="title">
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
    }
  },
  data: () => ({})
});
</script>
