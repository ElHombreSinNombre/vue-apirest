<template>
  <div class="bg-gray-700 text-white">
    <div class="md:flex">
      <div class="p-2">
        <div class="relative">
          <i class="absolute fa fa-search text-gray-400 top-5 left-4"></i>
          <input placeholder="Buscar...."  v-model="searchInput" type="text" ref="search" :disabled="loading == true ? true : false" class="border-none bg-transparent outline-0 h-14 px-12 " :class="loading == true ? 'opacity-50' : null" />
          <span class="absolute top-4 right-5 border-l pl-4"></span>
        </div>
      </div>
    </div>
  </div>
  <div class="flex-1 p-5 justify-center">
    <list
      :countries="countries"
      :loading="loading"
      :searchInput="searchInput"
    ></list>
  </div>
</template>

<script lang="ts">
import { useCountriesStore } from "../stores/countries";
import { watch, ref, onMounted, onUpdated } from "vue";
import list from "./main.vue";

export default {
  name: "headerComponent",
  components: {
    list,
  },
  //API Composition, nueva forma de organizar los datos en Vue 3
  setup() {
    const search = ref(null);
    const searchInput = ref("");
    const countries = ref([]);
    const loading = ref(false);
    const store = useCountriesStore();
    // Metodo que asigna el focus cuando se inicia la vista
    onMounted(() => {
      search.value.focus();
    });
    // Metodo que asigna el focus cuando se actualiza la vista
    onUpdated(() => {
      search.value.focus();
    });
    //Watcher para aplicar cambios y hacer búsqueda sin necesidad de llamar a eventos
    watch(searchInput, (v: String) => {
      searchInput.value = v.toLowerCase().trim();
      isLetterOrNumber(searchInput.value);
      if (searchInput.value.length == 0) {
        countries.value = [];
      }
      if (searchInput.value.length >= 3) {
        if (!loading.value) {
          ///En caso de que hayan pasado 300ms, llamamos a la función de búsqueda
          setTimeout(() => {
            //Usamos Pinia para hacer una store
            store.fetchCountries(searchInput.value);
            countries.value = store.getCountry;
            loading.value = false;
          }, 300);
        }
        loading.value = true;
      }
    });
    //Función para aceptar únicamente alfanuméricos
    function isLetterOrNumber(value: String) {
      if (value.match(/^[0-9a-z]+$/)) return true;
      searchInput.value = "";
    }
    //Función para buscar en maps la localización
    function openGoogleMap(lat: String, lon: String) {
      window.open(
        "https://www.google.com/maps/search/" + lat + "," + lon,
        "_blank"
      );
    }
    return {
      searchInput,
      countries,
      loading,
      search,
      isLetterOrNumber,
      openGoogleMap,
    };
  },
};
</script>