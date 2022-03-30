<template>
  <!-- Clases de Tailwind. Un poco obtusas al principio-->
  <div class="h-screen flex items-center justify-center">
    <search empty="No hay resultados"> </search>
  </div>
    <copyright class="fixed inset-x-0 bottom-0" business="Passpoter" url="https://passporterapp.com/es"></copyright>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import search from "./components/search.vue";
import copyright from "./components/footer.vue";

export default defineComponent({
  name: 'App',
  components: {
    search,
    copyright,
  }
});
</script>
