<template>
  <div class="h-5/6 flex items-center justify-center">
    <div class="w-96 rounded-xl shadow-md p-5 bg-white hover:shadow-lg text-justify" >
     <!-- Texto por defecto -->
      <div v-if="searchInput <  3 && loading == false" class="text-center p-0.5 ">
        <div>Introduzca una búsqueda para encontrar diferentes localizaciones</div>
        <i class="fa-2x p-0.5  fa-solid fa-earth-europe"></i>
      </div>
      <!-- Verificamos que el array no está vacio e iteramos -->
      <div v-if="countries && countries.length" class="overflow-y-auto max-h-80">
        <!-- Agregamos transición a la lista para mejorar el look & feel -->
        <TransitionGroup name="list" tag="ul">
          <li
            v-for="(countries, index) in countries"
            :key="index"
            class="text-gray-400 hover:text-black cursor-pointer mx-6"
            @click="openGoogleMap(countries.latlng)">
            <i class="fa-solid fa-circle-right"></i>
            {{ countries.name.common }}
          </li>
        </TransitionGroup>
      </div>
      <div v-if="countries.length > 0 && loading == false" class="text-center p-0.5">
        <b>{{ countries.length }}</b> elementos encontrados
      </div>
      <!-- Indicamos al usuario cuantos caracetes le hacen falta para comenzar la búsqueda -->
      <div v-if="searchInput.length >= 1 &&  searchInput.length <3 && countries.length == 0" class="text-center p-0.5 ">
        <i class="fas fa-info-circle p-0.5"></i> Escribe {{ 3 - searchInput.length }} caracter más
      </div>
      <!-- Texto en caso de que la búsqueda no devuelva nada -->
      <div v-if="countries.length == 0 && searchInput.length >= 3 && loading == false" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center"> No hay resultados
      </div>
      <!-- Icono que indica al usuario que se está realizando una búsqueda -->
      <div v-if="searchInput.length >= 3 && loading == true" class="text-center p-0.5 " >
        <div>Buscando...</div>
        <i class="fa-2x fas fa-spinner fa-spin p-0.5"></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "mainComponent",
  props: {"searchInput": String, "loading": Boolean, "countries": Array},
  //API Composition, nueva forma de organizar los datos en Vue 3
  setup() {
    //Función para buscar en maps la localización
    function openGoogleMap(latLong: String) {
      window.open(
        "https://www.google.com/maps/search/" + latLong,
        "_blank"
      );
    }
    return {
      openGoogleMap,
    };
  },
};
</script>