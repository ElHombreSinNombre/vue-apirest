<template>
  <div>
    <!-- Clases de Tailwind. Un poco obtusas al principio-->
    <div class="flex justify-center items-center h-screen">
      <div class="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20">
        <div class="flex justify-center md:justify-end -mt-16">
          <div class="flex items-center justify-center">
            <div class="relative text-gray-600">
              <div class="border-2 border-gray-200 rounded">
                <!-- Verificamos que es letra o número -->
                <input
                  type="text"
                  class="py-2 pl-2 w-full"
                  placeholder="Search...."
                  v-on:keypress="isLetterOrNumber($event)"
                  v-model="searchInput"
                />
              </div>
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
                class="text-center"
                >No hay resultados</strong
              >
            </div>
          </div>
        </div>
      </div>
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