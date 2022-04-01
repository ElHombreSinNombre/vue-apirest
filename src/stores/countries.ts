import { defineStore } from 'pinia';
import axios from "axios"

export const useCountriesStore = defineStore("countries", {
    state: () => ({
        countries: Array<[]>(),
    }),
    getters: {
        getCountry(state: any) {
            return state.countries
        }
    },
    actions: {
        async fetchCountries(value: string) {
            axios
                .get(
                    "https://nominatim.openstreetmap.org/search.php?q=" +
                    value +
                    "&format=jsonv2"
                )
                .then((response: any) => {
                    //Ordenamos por nombre y asignacmos a variable
                    response.data = response.data.sort((a: any, b: any) =>
                        a.display_name < b.display_name ? -1 : 1
                    );
                    this.countries = response.data;
                })
                .catch((e: String) => {
                    console.log(e);
                });
        }
    }
});
