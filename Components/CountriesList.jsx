import React, { use, useContext, useEffect } from 'react'
// import countriesdata from '../countriesdata'
import CountryCard from './CountryCard'
import CountriesListShimmer from './CountriesListShimmer'
import { ThemeContext } from '../Context/ThemeContext';
export default function CountriesList({ query }) {
  const [countriesdata, setCountriesData] = React.useState([])

  useEffect(() => {
    fetch(
      'https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,subregion,currencies,tld,languages,borders',
    )
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setCountriesData(data)
      })
    // const intervalId = setInterval(()=>{
    //   console.log("running countrieslist component");
    // }, [1000])
    // return () => {

    //   clearInterval(intervalId);
    // }
  }, [])
  console.log(countriesdata);
  // useEffect(() => {
  //   console.log("State Updated");
  // },[count,countriesdata])
  //   if(countriesdata.length === 0){

  // }
  // console.log(countriesdata);
  // const array = countriesdata.map((country) => {
  //   console.log(country)
  //   return (
  //     <CountryCard
  //     key={country.name.common}
  //     name={country.name.common}
  //     flag={country.flags.svg}
  //     population={country.population.toLocaleString('en-PK')}
  //     region={country.region}
  //     capital={country.capital?.[0]}
  //     />
  //   )
  // })

  // const filteredCountries =
  // console.log(filteredCountries)
  return (
    <>
      {countriesdata.length === 0 ? (
        <CountriesListShimmer />
      ) : (
        <div className="countries-container">
          {countriesdata
            .filter((country) =>
              country.name.common.toLowerCase().includes(query)|| country.region.toLowerCase().includes(query)
            )
            .map((country) => {
              // console.log(country)
              return (
                <CountryCard
                  key={country.name.common}
                  name={country.name.common}
                  flag={country.flags.svg}
                  population={country.population.toLocaleString('en-PK')}
                  region={country.region}
                  capital={country.capital?.[0]}
                  data={country}
                />
              )
            })}
        </div>
      )}
    </>
  )
}
