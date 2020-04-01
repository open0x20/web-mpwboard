<template>
  <v-sheet elevation="6" class="mx-auto">
    <v-sheet color="primary" min-height="3"></v-sheet>
    <v-container>
      <h3 class="title">{{ title }}</h3>
      <v-divider></v-divider>
      <slot></slot>
    </v-container>
  </v-sheet>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Sheet",
  props: ["title"],
  data: () => ({})
});
</script>
