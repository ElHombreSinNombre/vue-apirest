<template>
  <div class="h-screen flex items-center justify-center">
    <div class="w-96 rounded-xl shadow-md p-5 bg-white hover:shadow-lg text-justify">
      <div class="md:flex">
        <div class="w-full p-3">
          <div class="relative">
            <i class="absolute fa fa-search text-gray-400 top-5 left-4"></i>
            <input
              placeholder="Buscar...."
              v-model="searchInput"
              type="text"
              class="bg-white h-14 w-full px-12 rounded-lg cursor-pointer"
            />
            <span class="absolute top-4 right-5 border-l pl-4"></span>
          </div>
        </div>
      </div>
      <!-- Verificamos que el array no está vacio e iteramos -->
      <div v-if="countries && countries.length" class="overflow-y-auto max-h-80">
        <!-- Agregamos transición a la lista para mejorar el look & feel -->
        <TransitionGroup name="list" tag="ul">
          <li v-for="(countries, index) in countries" :key="index"
            class="text-gray-400 hover:text-black cursor-pointer mx-6"
            @click="openGoogleMap(countries.lat, countries.lon)"
          >
            <i class="fa-solid fa-circle-right"></i>
            {{ countries.display_name }}
          </li>
        </TransitionGroup>
      </div>
      <div v-if="countries.length > 0 && loading == false" class="px-4 py-3 rounded relative">
        <span><b>{{countries.length}}</b> elementos encontrados</span>
      </div>
      <!-- Indicamos al usuario cuantos caracetes le hacen falta para comenzar la búsqueda -->
      <div v-if=" searchInput.length >= 1 && searchInput.length < 3 && countries.length == 0 " class="px-4 py-3 rounded relative">
        <span ><i class="fas fa-info-circle"></i> Escribe {{ 3 - searchInput.length }} caracter más</span>
      </div>
      <!-- Texto en caso de que la búsqueda no devuelva nada -->
      <div v-if="countries.length == 0 && searchInput.length >= 3 && loading == false" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        <span>No hay resultados</span>
      </div>
      <!-- Icono que indica al usuario que se está realizando una búsqueda -->
      <div v-if="searchInput.length >= 3 && loading == true" class="flex justify-center items-center">
        <i class="fa-2x fas fa-spinner fa-spin"></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useCountriesStore } from "../stores/countries";
import { watch, ref } from "vue";

export default {
  name: "searchComponent",
  //API Composition, nueva forma de organizar los datos en Vue 3
  setup() {
    const searchInput = ref("");
    const countries = ref([]);
    const loading = ref(false);
    const store = useCountriesStore();
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
      isLetterOrNumber,
      openGoogleMap,
    };
  },
};
</script>