<template>
  <!-- Clases de Tailwind. Un poco obtusas al principio-->
  <div class="h-screen flex items-center justify-center">
    <search> </search>
  </div>
    <copyright class="fixed inset-x-0 bottom-0" business="Passpoter" url="https://passporterapp.com/es"></copyright>
</template>

<script>
import search from "./components/search.vue";
import copyright from "./components/footer.vue";

export default {
  name: "App",
  components: {
    search,
    copyright,
  },
};
</script>
