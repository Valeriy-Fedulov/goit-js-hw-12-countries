import {fetchCountries} from "./fetchCountries";
import templateCountries from "../template/countries.hbs";
import templateCountry from "../template/country.hbs";

const listCountriesRef = document.querySelector(".countries");
const inputListRef = document.querySelector(".inputList");

inputListRef.addEventListener('input', fetchCountries(inputListRef.value));

fetchCountries(item)
  .then(country => {
    if (country.length > 1) {
      const markup = country
        .map((count) => {
          return templateCountry(count);
        })
    
      listCountriesRef.innerHTML = markup;
    }else {
      const markup = country
        .map((count) => {
          return templateCountries(count);
        })
    
      listCountriesRef.innerHTML = markup;
    }
    })
    .catch(error => {
      console.log(error);
    });