import './sass/main.scss';
import API from './js/fetchCountries';
import REFS from './js/refs';
import { debounce } from 'lodash';
import '@pnotify/core/dist/BrightTheme.css';
const { error } = require('@pnotify/core');
import countryList from './templates/countryList.hbs';
import country from './templates/country.hbs';
const refs = REFS();

refs.input.addEventListener('input', debounce(onSearch, 1000))

function onSearch(e) {
    
    e.preventDefault();
    const searchQuery = e.target.value.trim()
    
    if (!searchQuery) return;

    hideCountryList()

    API.fetchCountries(searchQuery)
        .then(resultSearch)
        .catch(error => {
            console.log(error);
        });
}

function resultSearch(searchList) {
    if (searchList.length > 10) {
        error({
            text: 'too many matches searchList.length.Enter more letters!',
            delay: 2000,
            addClass: 'wrong',
        });
    } else if(searchList.length === 1) {
        renderMarkup(searchList, country);
    } else if (searchList.length >=2 && searchList.length <= 10) {
        renderMarkup(searchList, countryList);
    }
    console.log(searchList.length)
}

function renderMarkup(countries, name) {
    const markup = countries.map(county => name(county)).join('');
    refs.boxCountry.insertAdjacentHTML('beforeend', markup);
}

function hideCountryList() {
  refs.boxCountry.innerHTML = '';
}

// function keySpays(e) {
//     if (e.target.value.which === 32) 
//         return false;
//   }