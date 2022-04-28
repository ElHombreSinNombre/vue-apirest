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
                    "https://restcountries.com/v3.1/name/" +
                    value
                )
                .then((response: any) => {
                    //Ordenamos por nombre y asignacmos a variable
                    response.data = response.data.sort((a: any, b: any) =>
                        a.name.common < b.name.common ? -1 : 1
                    );
                    this.countries = response.data;
                })
                .catch((e: String) => {
                    console.log(e);
                });
        }
    }
});
