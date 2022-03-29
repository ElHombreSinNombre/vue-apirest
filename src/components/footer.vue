<template>
  <div class="p-4 bg-gray-300 text-gray-400 text-center hover:text-black">
    <a
      href="https://github.com/ElHombreSinNombre"
      target="_blank"
      class="cursor-pointer m-1"
    >
      <i class="fa-brands fa-github"></i
    ></a>
    <a
      href="https://laraasier.myportfolio.com/"
      target="_blank"
      class="cursor-pointer"
    >
      <i class="fa-solid fa-images m-1"></i>
    </a>
    <div>
      Asier Lara
      <p>
        Prueba de código realizada para <a :href="url"><b>{{ business }} </b></a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "footerComponent",
  props: ["business", "url"],
};
</script>