<template>
  <!-- Clases de Tailwind. Un poco obtusas al principio-->
  <div class="flex flex-col h-screen">
    <searchComponent></searchComponent>
    <footerComponent
      class="fixed inset-x-0 bottom-0"
      business="Passpoter"
      url="https://passporterapp.com/es"
    ></footerComponent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import searchComponent from "./components/header.vue";
import footerComponent from "./components/footer.vue";

export default defineComponent({
  name: "App",
  components: {
    searchComponent,
    footerComponent,
  },
});
</script>
