import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('ul');
const countryInfo = document.querySelector('div');

searchBox.addEventListener('input',onSearch);
// _.debounce(onSearch,DEBOUNCE_DELAY),

function onSearch(evt) {
    evt.preventDefult;

    countryList.innerHTML  = '';

    const name = searchBox.value.trim();
    console.log(name);

    fetchCountries(name)
    .then(countries => {

        const countOfContries = countries.length;
        
        if (countOfContries === 1){
            console.log(countries);
            countryInfo.innerHTML = makeCardCountry(countries); 
            // sw  swis
            // console.log(makeCardCountry(countries));
            
            

        } else if (countOfContries > 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');

        } else {
            // countryList.innerHTML = makeListCountries(countries)
            console.log(countries);
            countryList.innerHTML = makeListCountries(countries);
        }
    })
    .catch(error => Notiflix.Notify.failure('Oops, there is no country with that name'));

}

function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
    .then(response => {
        if(!response.ok) {
            throw new Error(response.statusText);
        };
        return response.json();

    })
};

function makeListCountries (countries) {
    return countries.map(country => `
        <li>
            <img src=${country.flags.svg} height=12/>
            <span >${country.name.official}</span>
        </li>`
    ).join('');
};

function makeCardCountry(countries) {
    return countries.map(country => `
    <ul>
        <li>
            <img src=${country.flags.svg} height=12/>
            <span font-style='bold'>${country.name.official}</span>
        </li>
        <li> 
            <span>Capital:</span> <span>${country.capital}</span>
        </li>
        <li>
            <span>Population:</span> <span>${country.population}</span>
        </li>
        <li>       
            <span>Languages:</span> <span>${country.languages}</span>
        </li>
    </ul>`).join('');
};



