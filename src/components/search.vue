<template>
  <div class="h-screen flex items-center justify-center">
    <!-- Card -->
    <div class="w-max rounded-xl shadow-md p-5 bg-white hover:shadow-lg text-justify">
      <input
        type="text"
        class="py-2 pl-2 w-full"
        placeholder="Buscar...."
        v-on:keypress="isLetterOrNumber($event)"
        v-model="searchInput"
      />
      <!-- Verificamos que el array no está vacio e iteramos -->
      <div v-if="countries && countries.length">
        <ul v-for="(countries, item) in countries" :key="item.id">
          <li>
            <i class="fa-solid fa-circle-right"></i>
            {{ countries.display_name }}
          </li>
        </ul>
      </div>
      <!-- Texto en caso de que la búsqueda no devuelva nada -->
      <strong
        v-if="searchInput.length > 0 && countries.length == 0"
        class="text-red-600 "
        >No hay resultados</strong
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "searchComponent",
  data() {
    return {
      searchInput: "",
      countries: [],
      awaitingSearch: false,
    };
  },
  //Watcher par aplicar cambios y hacer búsqueda sin necesidad de llamar a eventos
  watch: {
    searchInput: function (v) {
      this.searchInput = v.toLowerCase().trim();
      if (this.searchInput.length == 0) {
        this.countries = [];
      }
      if (this.searchInput.length >= 3) {
        if (!this.awaitingSearch) {
          setTimeout(() => {
            ///En caso de que hayan pasado 300ms, llamamos a la función de búsqueda
            this.api();
            this.awaitingSearch = false;
          }, 300);
        }
        this.awaitingSearch = true;
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
        .then((response) => {
          //Ordenamos por nombre y asignacmos a variable
          response.data = response.data.sort(
            (a, b) => a.display_name - b.display_name
          );
          this.countries = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    //Función de verificación de letra o número
    isLetterOrNumber(e) {
      let char = String.fromCharCode(e.keyCode);
      if (/^[a-zA-Z0-9]+$/.test(char)) return true;
      else e.preventDefault();
    },
  },
};
</script>