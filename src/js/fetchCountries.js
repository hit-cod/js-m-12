import notifyAboutMatches from './notification'
import suggestionList from './suggestedCountriesList.hbs'
import insertResults from './insertResults'
import refs from './refs'

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
    refs.resultList.innerHTML = '';
  
    if(searchedResults === 'too many results') {
    return refs.resultList.insertAdjacentHTML('afterbegin', '');
  }
  
    if(Array.isArray(searchedResults)) {
      const listOfSuggestions = suggestionList(searchedResults);
      return refs.resultList.insertAdjacentHTML('afterbegin', listOfSuggestions);
    }
    insertResults(searchedResults);  
  })
  .catch(error => {
    console.log(error);
  });
  };

export default fetchCountries;
