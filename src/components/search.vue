<template>
  <div class="h-screen flex items-center justify-center">
    <div class="w-96 rounded-xl shadow-md p-5 bg-white hover:shadow-lg text-justify">
      <div class="md:flex">
        <div class="w-full p-3">
          <div class="relative">
            <i class="absolute fa fa-search text-gray-400 top-5 left-4"></i>
            <input
              placeholder="Buscar...."
              v-on:keypress="isLetterOrNumber($event)"
              v-model="searchInput"
              type="text"
              class="bg-white h-14 w-full px-12 rounded-lg cursor-pointer"
            />
            <span class="absolute top-4 right-5 border-l pl-4"></span>
          </div>
        </div>
      </div>
      <!-- Verificamos que el array no está vacio e iteramos -->
      <div v-if="countries && countries.length" class="overflow-auto max-h-80">
        <ul v-for="(countries, item) in countries" :key="item.id">
          <li
            class="text-gray-400 hover:text-black cursor-pointer mx-6"
            @click="openGoogleMap(countries.lat, countries.lon)"
          >
            <i class="fa-solid fa-circle-right"></i>
            {{ countries.display_name }}
          </li>
        </ul>
      </div>
      <!-- Indicamos al usuario cuantos caracetes le hacen falta para comenzar la búsqueda -->
      <div v-if=" searchInput.length >= 1 && searchInput.length < 3 && countries.length == 0 " class="px-4 py-3 rounded relative">
        <span ><i class="fas fa-info-circle"></i> Escribe {{ 3 - searchInput.length }} caracter más</span>
      </div>
      <!-- Texto en caso de que la búsqueda no devuelva nada -->
      <div v-if="countries.length == 0 && searchInput.length >= 3 && loading == false" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        <span>{{ empty }}</span>
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
var store: any;

export default {
  name: "searchComponent",
  props: { empty: String },
  setup() {
    store = useCountriesStore();
  },
  data() {
    return {
      searchInput: "",
      countries: [],
      loading: false,
    };
  },
  //Watcher par aplicar cambios y hacer búsqueda sin necesidad de llamar a eventos
  watch: {
    searchInput: function (v: string) {
      this.searchInput = v.toLowerCase().trim();
      if (this.searchInput.length == 0) {
        this.countries = [];
      }
      if (this.searchInput.length >= 3) {
        if (!this.loading) {
          ///En caso de que hayan pasado 300ms, llamamos a la función de búsqueda
          setTimeout(() => {
            //Usamos Pinia para hacer una store
            store.fetchCountries(this.searchInput);
            this.countries = store.getCountry;
            this.loading = false;
          }, 300);
        }
        this.loading = true;
      }
    },
  },
  methods: {
    //Función de verificación de letra o número
    isLetterOrNumber(e: any) {
      let char = String.fromCharCode(e.keyCode);
      if (/^[a-zA-Z0-9]+$/.test(char)) return true;
      else e.preventDefault();
    },
    //Función para buscar en maps la localización
    openGoogleMap(lat: string, lon: string) {
      window.open(
        "https://www.google.com/maps/search/?api=1&query=" + lat + "," + lon,
        "_blank"
      );
    },
  },
};
</script>