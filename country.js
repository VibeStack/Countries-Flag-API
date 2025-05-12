const countryName = new URLSearchParams(location.search).get('name');
const flagImg = document.querySelector('.country-details img');
const countryNameElement = document.querySelector('.details-text-container h1');
const borderCounties = document.querySelector('.border-countries');
const backButton = document.querySelector('.back-button');

const nativeName = document.querySelector('.native-name');
const population = document.querySelector('.population');
const region = document.querySelector('.region');
const subRegion = document.querySelector('.sub-region');
const capital = document.querySelector('.capital');
const topLevelDomain = document.querySelector('.top-level-domain');
const currencies = document.querySelector('.currencies');
const language = document.querySelector('.language');


fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
.then((res) => res.json())
.then(([country])=>{
    console.log(country);
    flagImg.src = country.flags.svg;
    countryNameElement.innerText = country.name.common;
    population.innerText = country.population.toLocaleString('en-IN');
    region.innerText = country.region;
    topLevelDomain.innerText = country.tld.join(' , ');

    if(country.name.nativeName){
        nativeName.innerText = Object.values(country.name.nativeName)[0].common || country.name.common
    }
    else{
        nativeName.innerText = country.name.common;
    }
    if(country.capital){
       capital.innerText = country.capital?.[0]; 
    }
    if(country.subRegion){
        subRegion.innerText = country.subregion;
    }
    if(country.currencies){
        currencies.innerText = Object.values(country.currencies).map((currency)=>currency.name).join(' , ');
    }
    if(country.languages){
        language.innerText = Object.values(country.languages).join(' , ');
    }
    if(country.borders){
        country.borders.forEach((border) => {
            console.log(border);
            fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then((res)=>res.json())
            .then(([borderCountry])=>{
                console.log(borderCountry);
                const borderCountryTag = document.createElement('a');
                borderCountryTag.innerText = borderCountry.name.common;
                borderCountryTag.href = `country.html?name=${borderCountry.name.common}`
                borderCounties.append(borderCountryTag);
            })
        });
    }
})
