const countriesContainer = document.querySelector(".countries-container");
const searchFilterContainer = document.querySelector('.search-filter-container select');
const searchInput = document.querySelector('.search-container');
const themeChager = document.querySelector('.theme-changer');
let allCountriesData = '';


function renderCountries(data){
    countriesContainer.innerText = "";
    data.forEach((country) => {
        const countryCard = document.createElement("a");
        countryCard.classList.add("country-card");
        countryCard.href = `./country.html?name=${country.name.common}`;
        countryCard.innerHTML = `
            <img src="${country.flags.svg}" alt="${country.name.common} flag">
            <div class="card-text">
                <h3 class="card-title">${country.name.common}</h3>
                <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
                <p><b>Region: </b>${country.region}</p>
                <p><b>Capital: </b>${country.capital?.[0]}</p>
            </div>
        `;
        countriesContainer.append(countryCard);
    });
}

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data)=>{
    renderCountries(data);
    allCountriesData = data;
  });


const filterByRegion = document.querySelector('.filter-by-region');
filterByRegion.addEventListener('change',(e)=>{
    console.log(filterByRegion.value);
    fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
  .then((res) => res.json())
  .then(renderCountries);
})

searchInput.addEventListener('input',(e)=>{
    console.log(e.target.value);
    const filteredCountries = allCountriesData.filter((country)=> country.name.common.toLowerCase().includes(e.target.value.toLowerCase()));
    renderCountries(filteredCountries);
})

themeChager.addEventListener('click',()=>{
    document.body.classList.toggle('dark');
    const classExist = document.body.getAttribute('class');
    if(classExist=='dark'){
        themeChager.innerHTML = '<i class="fa-solid fa-sun"></i>&nbsp;&nbsp;Light Mode';
    }
    else{
        themeChager.innerHTML = '<i class="fa-regular fa-moon"></i>&nbsp;&nbsp;Dark Mode';
    }
})