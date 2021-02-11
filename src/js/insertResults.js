import countryTemplate from './countryTemplate.hbs'
import refs from './refs'

const insertResults = searchedResults => {
    const markup = countryTemplate(searchedResults);
    refs.resultList.insertAdjacentHTML('afterbegin', markup);
    }

export default insertResults;