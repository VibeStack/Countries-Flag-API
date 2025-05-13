const countriesContainer = document.querySelector(".countries-container");
const searchFilterContainer = document.querySelector('.search-filter-container select');
const searchInput = document.querySelector('.search-container');
const themeChager = document.querySelector('.theme-changer');
const resetFilter = document.querySelector('.reset');
let allCountriesData = '';

const isDark=localStorage.getItem('isDark');
localStorage.setItem('isDark',isDark);

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
                <p><b>Capital: </b>${country.capital?.[0] || "None"}</p>
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
    fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
  .then((res) => res.json())
  .then(renderCountries);
})

searchInput.addEventListener('input',(e)=>{
    const filteredCountries = allCountriesData.filter((country)=> country.name.common.toLowerCase().includes(e.target.value.toLowerCase()));
    renderCountries(filteredCountries);
})

resetFilter.addEventListener('click',(e)=>{
    filterByRegion.value = 'Filter By Region';
    fetch(`https://restcountries.com/v3.1/all`)
  .then((res) => res.json())
  .then(renderCountries);
})

if(isDark=='true'){
    document.body.classList.add('dark');
    themeChager.innerHTML = '<i class="fa-solid fa-sun"></i>&nbsp;&nbsp;Light Mode';
}
themeChager.addEventListener('click',()=>{
    document.body.classList.toggle('dark');

    const classExist = document.body.getAttribute('class');
    if(classExist=='dark'){
        themeChager.innerHTML = '<i class="fa-solid fa-sun"></i>&nbsp;&nbsp;Light Mode';
        localStorage.setItem('isDark',true);
    }
    else{
        themeChager.innerHTML = '<i class="fa-regular fa-moon"></i>&nbsp;&nbsp;Dark Mode';
        localStorage.setItem('isDark',false);
    }
})
