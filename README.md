# Guía

### Para ejecutar la aplicación

    npm install
    npm run serve

### Para compilarlo y desplegarlo en un servidor

    npm run build | npm run dev

### Notas

 - Se ha usado **[Tailwind](https://tailwindcss.com/)** y **[Fontawesome](https://fontawesome.com/)** para maquetación.
 
 - En la última versión de **[Vue](https://vuejs.org/)** hay un reemplazo a **[Vuex](https://vuex.vuejs.org/)** llamado **[Pinia](https://pinia.vuejs.org/)**. He usado este último.
 
 - Cada vez que se actualizan los ficheros de la rama *master* se lanza un script de **[Github Actions](https://github.com/features/actions)** (similar a **[Jenkins](https://www.jenkins.io/)** o **[Gitlab CI/CD](https://docs.gitlab.com/ee/ci/)**) que instala en un entorno **Linux** (en este caso **Ubuntu**) toda la paquetería, compila el proyecto y lo sube a la rama *gh-pages*. Cuando se haga publico el proyecto se podría publicar con **[Github Pages](https://pages.github.com/)**.
