import './sass/main.scss';
import API from './js/fetchCountries';
import REFS from './js/refs';
import { debounce } from 'lodash';
import { error, Stack } from '@pnotify/core';
// import '@pnotify/core/dist/BrightTheme.css';
import countyList from './templates/countyList.hbs';
import county from './templates/country.hbs';
const refs = REFS();

refs.input.addEventListener('input', debounce(onSearch, 500))

function onSearch(e) {
    e.preventDefault();
    const searchQuery = e.target.value
    // hideCountryList()

    API.fetchCountries(searchQuery)
        .then(resultSearch)
        .catch(error => {
            console.log(nu - takoe);
        });
}

function resultSearch(searchList) {
    if (searchList.length > 10) {
        error({
            text: 'too many matches ${searchList.length}.Enter more letters!',
            delay: 250,
        });
    } else if (2 <= searchList.length <= 10) {
        renderMarkup(searchList, countyList);
    } else if(searchList.length === 1) {
        renderMarkup(searchList, country);
    }
}

function renderMarkup(countries, name) {
    const markup = countries.map(county => name(county)).join('');
    refs.boxCountry.insertAdjacentHTML('beforeend', markup);
}

function hideCountryList() {
  refs.boxCountry.innerHTML = '';
}