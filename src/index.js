import './styles.css';
import countryTemplate from './js/countryTemplate.hbs'
import suggestionList from './js/suggestedCountriesList.hbs'
// import fetchCountries from './js/fetchCountries';

import "./styles.css";
import { error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
// import * as Confirm from "@pnotify/confirm";
import "@pnotify/confirm/dist/PNotifyConfirm.css";

const debounce = require('lodash.debounce');

const userInput = document.querySelector('input[name="conuntry-name"]');
const resultList = document.querySelector('div[data-action="searchResults"]');

const checkInput = debounce((e) => {
  fetchCountries(e.target.value);
}, 500);

const fetchCountries = (inputOfUser) => {
  fetch(`https://restcountries.eu/rest/v2/name/${inputOfUser}`)
.then(response => response.json())
.then(res => {
  if(res.length >= 10) {
    notifyAboutMatches();
    return 'too many results'
  }

  if (1 < res.length && res.length < 10) {
    const countries = res.map( country => country.name);
    return countries
  }

    return {
      nameOfCountry: res[0].name,
      capital: res[0].capital,
      population: res[0].population,
      languages: [...res[0].languages.map(language => language.name)],
      flagLink: res[0].flag,
    }     
       
})
.then(searchedResults => { 
  resultList.innerHTML = '';

  if(searchedResults === 'too many results') {
  return resultList.insertAdjacentHTML('afterbegin', '');
}

  if(Array.isArray(searchedResults)) {
    const listOfSuggestions = suggestionList(searchedResults);
    return resultList.insertAdjacentHTML('afterbegin', listOfSuggestions);
  }
  insertResults(searchedResults);  
})
.catch(error => {
  console.log(error);
});
};

const notifyAboutMatches = () => {
  error({
    text: 'Too many matches found. Please enter amore specific query!'
  });
  };

const insertResults = searchedResults => {
const markup = countryTemplate(searchedResults);
resultList.insertAdjacentHTML('afterbegin', markup);
}

userInput.addEventListener('input', checkInput);




