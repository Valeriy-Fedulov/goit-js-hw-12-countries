import {fetchCountries} from "./fetchCountries";
import templateCountries from "../template/countries.hbs";
import templateCountry from "../template/country.hbs";
import {error, defaults, defaultStack} from '../../node_modules/@pnotify/core/dist/PNotify.js';

const debounce = require('lodash.debounce');

defaults.mode = 'light';

const listCountriesRef = document.querySelector(".countries");
const getCountryRef = document.querySelector(".country");
const inputListRef = document.querySelector(".inputlist");

inputListRef.addEventListener('input', debounce(onInputSearche, 500));
listCountriesRef.addEventListener('click', onListSearche);

function onInputSearche(e) {
  listCountriesRef.innerHTML = '';
  getCountryRef.innerHTML = '';
  if (e.target.value === "" || e.target.value === " ") return;
  fetchCountries(e.target.value)
    .then(country => {
      defaultStack.close();
      if (country.length > 10) {
        error({
          text: 'Too many matches found. Please enter a more specific query!'
        });
      } else {
        if (country.length > 1) {
          const markup = country
            .map((count) => {
              return templateCountries(count);
            })
            .join("");
          listCountriesRef.innerHTML = markup;
        } else {
          const markup = country
            .map((count) => {
              return templateCountry(count);
            })
          getCountryRef.innerHTML = markup;
          e.target.value = "";
        }
      }
    })
    .catch(errors => {
      error({
          text: 'Invalid characters entered. Please enter a country name!'
        });
    })  
};

function onListSearche(e) {
  listCountriesRef.innerHTML = '';
  console.dir(e.target.textContent);
  fetchCountries(e.target.textContent)
  .then(country => {
            const markup = country
            .map((count) => {
              return templateCountry(count);
            })
          getCountryRef.innerHTML = markup;
          inputListRef.value = "";
        }
      )
    .catch(errors => {
      error({
          text: 'Invalid characters entered. Please enter a country name!'
        });
    })  
}