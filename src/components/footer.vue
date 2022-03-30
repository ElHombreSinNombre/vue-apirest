<template>
  <div class="ease-in-out duration-300 p-4 bg-gray-300 text-center text-gray-400 hover:text-black">
    <a href="https://github.com/ElHombreSinNombre" target="_blank" class="cursor-pointer m-1">
      <i class="fa-brands fa-github" title="Github"></i></a>
    <a href="https://laraasier.myportfolio.com/" target="_blank" class="cursor-pointer">
      <i class="fa-solid fa-images m-1" title="Adobe portfolio"></i>
    </a>
    <div>
      Asier Lara
      <p> Prueba de código realizada para <a :href="url"><b>{{ business }} </b></a> </p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "footerComponent",
  props: {"business": String, "url": String},
};
</script>