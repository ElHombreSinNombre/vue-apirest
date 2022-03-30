<template>
  <div class="h-screen flex items-center justify-center">
    <div class=" w-max rounded-xl shadow-md p-5 bg-white hover:shadow-lgtext-justify">
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
      <div v-if="countries && countries.length">
        <ul v-for="(countries, item) in countries" :key="item.id">
          <li
            class="text-gray-400 hover:text-black cursor-pointer"
            @click="openGoogleMap(countries.lat, countries.lon)"
          >
            <i class="fa-solid fa-circle-right"></i>
            {{ countries.display_name }}
          </li>
        </ul>
      </div>
      <!-- Texto en caso de que la búsqueda no devuelva nada -->
      <div v-if="countries.length == 0 && searchInput.length >= 3 && loading == false" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        <span>{{ empty }}</span>
      </div>
      <!-- Icono de carga -->
      <div v-if="searchInput.length >= 3 && loading == true"  class="flex justify-center items-center ">
        <i class="fa-2x fas fa-spinner fa-spin"></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";

export default {
  name: "searchComponent",
  props: { empty: String },
  data() {
    return {
      searchInput: "",
      countries: [],
      loading: false,
    };
  },
  //Watcher par aplicar cambios y hacer búsqueda sin necesidad de llamar a eventos
  watch: {
    searchInput: function (v: String) {
      this.searchInput = v.toLowerCase().trim();
      if (this.searchInput.length == 0) {
        this.countries = [];
      }
      if (this.searchInput.length >= 3) {
        if (!this.loading) {
          setTimeout(() => {
            ///En caso de que hayan pasado 300ms, llamamos a la función de búsqueda
            this.api();
            this.loading = false;
          }, 300);
        }
        this.loading = true;
      }
    },
  },
  methods: {
    api() {
      axios
        .get(
          "https://nominatim.openstreetmap.org/search.php?q=" +
            this.searchInput +
            "&format=jsonv2"
        )
        .then((response: any) => {
          //Ordenamos por nombre y asignacmos a variable
          response.data = response.data.sort((a: any, b: any) =>
            a.display_name < b.display_name ? -1 : 1
          );
          this.countries = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    //Función de verificación de letra o número
    isLetterOrNumber(e: any) {
      let char = String.fromCharCode(e.keyCode);
      if (/^[a-zA-Z0-9]+$/.test(char)) return true;
      else e.preventDefault();
    },
    //Función para buscar en maps la localización
    openGoogleMap(lat: String, lon: String) {
      window.open(
        "https://www.google.com/maps/search/?api=1&query=" + lat + "," + lon,
        "_blank"
      );
    },
  },
};
</script>